import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {receiveNewImage} from '../actions';


export class ImageUploader extends PureComponent {
  static propTypes = {
    defaultImageSrc: PropTypes.string,
    receiveNewImage: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {defaultImageSrc} = this.props;

    if (defaultImageSrc) {
      this.processImage(defaultImageSrc);
    }
  }

  handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = ev => {
      this.processImage(ev.target.result);
    };

    reader.readAsDataURL(file);
  }

  processImage = (src) => {
    const {receiveNewImage} = this.props;

    const image = document.createElement('img');

    image.onload = () => receiveNewImage(image);

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

const mapDispatchToProps = {receiveNewImage};

export default connect(null, mapDispatchToProps)(ImageUploader);
