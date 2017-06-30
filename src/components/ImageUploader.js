import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux'
import PropTypes from 'prop-types';

import {receiveNewImage} from '../actions';
import {readAsDataURL, loadImage} from '../utils/image.utils.js'


export class ImageUploader extends PureComponent {
  static propTypes = {
    defaultImageSrc: PropTypes.string,
    receiveNewImage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  handleUpload = (file) => {
    readAsDataURL(file).then(this.processImage);
  }

  processImage = (src) => {
    const {receiveNewImage, push} = this.props;

    loadImage(src).then((image) => {
      receiveNewImage(image);
      push('/create');
    }).catch(console.error);
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

const mapDispatchToProps = {receiveNewImage, push};

export default connect(null, mapDispatchToProps)(ImageUploader);
