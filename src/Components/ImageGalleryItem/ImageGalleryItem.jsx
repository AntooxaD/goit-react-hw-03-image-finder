import { GalleryItem, GalleryItemImage } from '../Style/styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, onClick }) {
    return (
        <>
            {images.map(({ id, webformatURL, largeImageURL }) => (
                <GalleryItem key={id} onClick={() => onClick(largeImageURL)}>
                    <GalleryItemImage src={webformatURL} />
                </GalleryItem>
            ))}
        </>
    )
}

ImageGalleryItem.propTypes = {
     images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })),
    onClick: PropTypes.func,
}