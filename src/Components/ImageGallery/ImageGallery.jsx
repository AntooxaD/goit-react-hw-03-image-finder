import { Component } from "react";
import imgApi from '../Api/Api';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {Gallery, Loader} from '../Style/styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button'
import Modal from '../Modal/Modal'


export default class ImageGallery extends Component {
    state = {
        images: null,
        loading: false,
        error: null,
        openModal: false,
        selectedImage: null,
        page: 1,
        status: 'idle',
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({ page: 1, status: 'pending' });

            imgApi
                .fetchImages(this.props.searchQuery, this.state.page)
                .then(images => {
                    if (!images.hits.length) {
                        this.setState({ status: 'idle'});
                        return toast.error(`No matches found`)
                    }
                    this.setState({ images: images.hits, status: 'resolved', page: this.state.page + 1 })
                })
                .catch(error => this.setState({ error, status: 'rejected'}))
        }
    }
    handleImageClick = link => {
        this.setState(({ openModal }) => ({
            openModal: !openModal
        }));
        this.setState({ selectedImage: link });
    }

    handleLoadMoreBnt = () => {
        this.setState({ page: this.state.page + 1 });

        imgApi
            .fetchImages(this.props.searchQuery, this.state.page)
            .then(images => {
                this.setState(prevState => ({
                    images: [...prevState.images, ...images.hits],
                }));
            })
    }
    render() {
        const { images, error, status, openModal, selectedImage } = this.state;
        if (status === 'idle') {
            return <div></div>;
        }
        if (status === 'pending') {
            return (
                <Loader
                    type="BallTriangle"
                    color="#000"
                    height={50}
                    width={50}
                />
            )
        }
        if (status === 'rejected') {
            return <h2>{error.message}</h2>;
        }
        if (status === 'resolved') {
            return (
                <div>
                    <Gallery>
                        <ImageGalleryItem images={images} onClick={this.handleImageClick}/>
                    </Gallery>
                    {openModal &&
                        <Modal onClose={this.handleImageClick}>
                            <img src={selectedImage} alt="" onClick={this.handleImageClick}/>
                        </Modal>
                    }
                    {images.length > 11 && <Button onClick={this.handleLoadMoreBnt}/>}
                </div>
            );
        }
    
    }
}
ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired
}