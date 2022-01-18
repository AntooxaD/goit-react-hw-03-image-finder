import { GalleryItem, GalleryItemImage } from '../Style/styled';
import PropTypes from 'prop-types';


export default function ImageGalleryItem({ images, onClick,  }) {
    return (
        <>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <GalleryItem key={id} onClick={() => onClick(largeImageURL)}>
                    <GalleryItemImage src={webformatURL}  alt={tags}/>
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
        alt: PropTypes.string
    })),
    onClick: PropTypes.func,
}