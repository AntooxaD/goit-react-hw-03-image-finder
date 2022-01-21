import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
import Searchbar from "./сomponents/Searchbar/Searchbar";
import ImageGallery from "./сomponents/ImageGallery/ImageGallery";
import api from "./сomponents/Api/Api";
import Button from "./сomponents/Button/Button";
import Modal from "./сomponents/Modal/Modal";
// import LoaderSpin from './Components/Loader/Loader'
import { Spinner } from "./сomponents/Style/styled";

export default class App extends Component {
  state = {
    searchQuery: ``,
    images: [],
    loading: false,
    error: null,
    openModal: false,
    selectedImage: null,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.fetchImg();
    }
  }
  fetchImg = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });
    api
      .fetchImages(searchQuery, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return this.setState({
            error: `Не удалось найти картинку по запросу ${searchQuery}`,
          });
        }
        this.setState(({ images, page }) => ({
          images: [...images, ...hits],
          page: page,
        }));
      })
      .catch((error) => this.setState({ error: "Побробуйте снова" }))
      .finally(() => {
        this.setState({ loading: false });
        console.log(this.state.images);
      });
  };
  handleImageClick = (e) => {
    if (!e.target.matches("img")) return;
    e.preventDefault();
    this.setState({
      openModal: true,
      selectedImage: e.target.dataset.source,
    });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  handleLoadMoreBnt = () => {
    this.setState({ page: this.state.page + 1 });
    this.scrolling();
  };

  scrolling = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 500);
  };

  handleSubmit = (searchQuery) => {
    this.setState({ searchQuery, images: [], page: 1, error: null });
  };

  render() {
    const { images, error, loading, openModal, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <Spinner />}
        {images.length > 0 && !error && (
          <>
            <ImageGallery openModal={this.handleImageClick} images={images} />
            {images && images.length > 11 && (
              <Button onClick={this.handleLoadMoreBnt} />
            )}
          </>
        )}
        {openModal && (
          <Modal onClose={this.closeModal} src={selectedImage}></Modal>
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
