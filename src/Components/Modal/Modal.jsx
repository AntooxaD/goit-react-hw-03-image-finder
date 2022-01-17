import { createPortal } from 'react-dom';
import {Component} from 'react'
import PropTypes from 'prop-types';
import { Overlay, Modalbox, Loader } from '../Style/styled';
 

const modalRoot = document.getElementById("modal-root");
export default class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(
            <Overlay onClick={this.handleOverlayClick}>
                <Loader/>
                <Modalbox>{this.props.children}</Modalbox>
            </Overlay>,
            modalRoot,
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
}