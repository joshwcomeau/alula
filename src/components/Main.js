import React, { Component } from 'react';
import styled from 'styled-components';

import {media} from '../constants';

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

class Main extends Component {
  renderPortrait() {
    return (
      <PortraitOnly style={{ height: '100%' }}>
        <Column style={{ minHeight: '100%' }}>
          <TopControls />
          <Canvas />
          <BottomControls />
        </Column>
      </PortraitOnly>
    )
  }

  renderLandscape() {
    return (
      <LandscapeOnly>
        <Row>
          <Canvas />
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

export default Main;
