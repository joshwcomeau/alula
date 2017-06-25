import React, { Component } from 'react';
import styled from 'styled-components';

import ImageUploader from './ImageUploader';
import Canvas from './Canvas';

import DEFAULT_IMAGE_SRC from './assets/plant.jpg';

const CanvasHolder = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ImageUploaderHolder = styled.div`
  position: relative;
  z-index: 2;
  background: #FFF;
  padding: 1rem;
`;

class App extends Component {
  state = {
    image: null,
  }

  handleImageChange = (image) => {
    this.setState({ image })
  }

  render() {
    const {image} = this.state;

    return (
      <div>
        <ImageUploaderHolder>
          <ImageUploader handleImageChange={this.handleImageChange} />
        </ImageUploaderHolder>

        <CanvasHolder>
          <Canvas image={image} defaultImageSrc={DEFAULT_IMAGE_SRC} />
        </CanvasHolder>
      </div>
    );
  }
}

export default App;
