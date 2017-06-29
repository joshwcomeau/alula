import React, { Component } from 'react';
import styled from 'styled-components';

import {media} from '../constants';
import DEFAULT_IMAGE_SRC from '../assets/plant.jpg';

import ImageUploader from './ImageUploader';
import TopControls from './TopControls';
import BottomControls from './BottomControls';
import Canvas from './Canvas';


const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const FullHeight = styled.div`
  height: 100%;
`;

const LandscapeOnly = styled.div`
  ${media.portrait`
    display: none;
  `}
`;

const PortraitOnly = styled.div`
  ${media.landscape`
    display: none;
  `}
`;

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

  renderPortrait() {
    const {image} = this.state;

    return (
      <PortraitOnly style={{ height: '100%' }}>
        <Column style={{ minHeight: '100%' }}>
          <TopControls />
          <Canvas image={image} />
          <BottomControls />
        </Column>
      </PortraitOnly>
    )
  }

  renderLandscape() {
    const {image} = this.state;

    return (
      <LandscapeOnly>
        <Row>
          <Canvas image={image} />
          <Column style={{ flex: 1 }}>
            <TopControls />
            <BottomControls style={{ flex: 1 }}/>
          </Column>
        </Row>
      </LandscapeOnly>
    )
  }

  render() {

    return (
      <FullHeight>
        {this.renderPortrait()}
        {this.renderLandscape()}
      </FullHeight>
    );
  }
}

{/* <ImageUploaderHolder>
  <ImageUploader
    defaultImageSrc={DEFAULT_IMAGE_SRC}
    handleImageChange={this.handleImageChange}
  />
</ImageUploaderHolder> */}

export default App;
