import { GalleryItem, GalleryItemImage } from "../Style/styled";
import PropTypes from "prop-types";
import { Component } from "react";
import LoaderSpin from "../Loader/Loader";

class ImageGalleryItem extends Component {
  state = { loading: true };
  onLoadHandle = () => {
    this.setState({ loading: false });
  };
  render() {
    const { webImage, largeImage, tags } = this.props;
    const { loading } = this.state;
    return (
      <GalleryItem>
        {loading && <LoaderSpin radius={160} />}
        <GalleryItemImage
          src={webImage}
          data-source={largeImage}
          alt={tags}
          style={{
            opacity: loading ? "0" : "1",
          }}
          onLoad={this.onLoadHandle}
        />
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
export default ImageGalleryItem;
