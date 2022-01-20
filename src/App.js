import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Component} from 'react'
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import api from './Components/Api/Api';
import Button from './Components/Button/Button';
import Modal from './Components/Modal/Modal';
// import LoaderSpin from './Components/Loader/Loader'
import {Spinner} from './Components/Style/styled'

export default class App extends Component {
state = {
        searchQuery: ``,
        images: [],
        loading: false,
        error: null,
        openModal: false,
        selectedImage: null,
        page: 1,
        
          
}

componentDidUpdate(prevProps, prevState) {
  if (
    prevState.searchQuery !== this.state.searchQuery ||
    prevState.page !== this.state.page
  ) {
    this.fetchImg();
  }
}
fetchImg = ()  => {
  const { searchQuery, page } = this.state;
  this.setState({loading: true})
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
      .finally(() => {this.setState({ loading: false })
      console.log(this.state.images)});


}
handleImageClick = e => {
  e.preventDefault();
    this.setState({
      openModal: true,
      selectedImage: e.target.dataset.largeimg,
    });  
}

closeModal = () => {
  this.setState({ openModal: false });
};

handleLoadMoreBnt = () => {
  this.setState({ page: this.state.page + 1 });
  this.scrolling()
}

scrolling = () => {
  setTimeout(() => {
    window.scrollBy({
      top: document.documentElement.clientHeight - 150,
      behavior: "smooth",
    });
  }, 1000);
};

handleSubmit = searchQuery => {
  this.setState({searchQuery, images: [], page: 1, error: null });
  
};

  render() {
  const { images, error, loading, openModal, selectedImage } = this.state;
        
   return <div className="App">
      <Searchbar onSubmit={this.handleSubmit} />
      {loading && <Spinner />}
      {images.lengs > 0 && !error && (
      <>
      <ImageGallery openModal={this.handleImageClick} images={images}/>
      <Button onClick={this.handleLoadMoreBnt}/>
      </>
      )}    
      {openModal && ( <Modal onClose={this.handleImageClick} src={selectedImage} >

                      </Modal>
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
               
  </div>;
        }

}