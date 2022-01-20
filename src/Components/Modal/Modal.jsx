import { createPortal } from 'react-dom';
import {Component} from 'react'
import PropTypes from 'prop-types';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Overlay, Modalbox } from '../Style/styled';

const modalRoot = document.getElementById("modal-root");
export default class Modal extends Component {
   state = {
       loading: false,
   }
   toggleLoadind() {
    this.setState((prevState) => {
      return { loading: !prevState.loading };
    });
  }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();          
        }
    }
    handleImageLoaded = () => {
        this.setState({loading:false})
    }
    render() {
        const { src, alt } = this.props;
        return createPortal(
        
            <Overlay onClick={this.handleOverlayClick}>   

                <Modalbox onLoad={this.handleImageLoaded}> 
                <img src={src} alt={alt}></img>
                </Modalbox>
                {this.state.loading && (<Loader type="BallTriangle" color="#3f51b5" height={350} />)}
            </Overlay>,
            modalRoot,
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
}