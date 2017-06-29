import React, {PureComponent} from 'react';


class ImageUploader extends PureComponent {
  componentDidMount() {
    this.processImage(this.props.defaultImageSrc);
  }

  handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = ev => {
      this.processImage(ev.target.result);
    };

    reader.readAsDataURL(file);
  }

  processImage = src => {
    const image = document.createElement('img');

    image.onload = () => this.props.handleImageChange(image);

    image.src = src;
  }

  render() {
    return (
      <div>
        <input
          type="file"
          onChange={ev => this.handleUpload(ev.target.files[0])}
        />
      </div>
    )
  }
}

export default ImageUploader;
