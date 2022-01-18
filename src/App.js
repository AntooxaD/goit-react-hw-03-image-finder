import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Component} from 'react'
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';

export default class App extends Component {
state = {
  searchQuery: ``
}
handleSubmit = searchQuery => {
  this.setState({ searchQuery });
  
};
  render() {return <div className="App">
    <Searchbar onSubmit={this.handleSubmit} />
    <ImageGallery searchQuery={this.state.searchQuery} />
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
  
}}

