import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ImageUploader from './ImageUploader';

import DEFAULT_IMAGE_SRC from '../assets/plant.jpg';

class Intro extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  handleImageChange = () => {
    console.log('Change!');
    this.props.history.push('/my-new-location')
  }

  render() {
    return (
      <div>
        Hello there!

        <ImageUploader
          defaultImageSrc={DEFAULT_IMAGE_SRC}
          handleImageChange={this.handleImageChange}
        />
      </div>
    )
  }
}

export default Intro;
