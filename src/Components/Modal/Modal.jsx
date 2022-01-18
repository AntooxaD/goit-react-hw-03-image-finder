import { createPortal } from 'react-dom';
import {Component} from 'react'
import PropTypes from 'prop-types';
import { Overlay, Modalbox } from '../Style/styled';
 

const modalRoot = document.getElementById("modal-root");
export default class Modal extends Component {
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

    render() {
        const {children} = this.props
        return createPortal(
            <Overlay onClick={this.handleOverlayClick}>             
                <Modalbox>{children}</Modalbox>
            </Overlay>,
            modalRoot,
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
}