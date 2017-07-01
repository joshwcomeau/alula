import React, { Component } from 'react';

import TopControls from './TopControls';
import BottomControls from './BottomControls';
import Canvas from './Canvas';
import {
  Column,
  Row,
  FullHeight,
  LandscapeOnly,
  PortraitOnly,
} from './utility-components';


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