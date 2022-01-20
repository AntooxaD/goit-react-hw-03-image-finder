import { GalleryItem, GalleryItemImage } from '../Style/styled';
import PropTypes from 'prop-types';


function ImageGalleryItem ({ src, largeImage, openModal, tags }) {
    return (          
                <GalleryItem >
                    <GalleryItemImage  onClick={() => openModal(largeImage)}
                    src={src}   
                    dataLargeUmg={largeImage}                
                    alt={tags}/>
                </GalleryItem>
            
     
    )
}

ImageGalleryItem.propTypes = {
        
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
        onClick: PropTypes.func,  
}
export default ImageGalleryItem