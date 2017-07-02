import React, { Component } from 'react';
import {connect} from 'react-redux';

import TopControls from './TopControls';
import BottomControls from './BottomControls';
import Canvas from './Canvas';
import DownloadModal from './DownloadModal';
import {
  Column,
  Row,
  FullHeight,
  LandscapeOnly,
  PortraitOnly,
} from './utility-components';


class Main extends Component {
  componentDidMount() {
    // If we've navigated to this page without an image loaded,
    // redirect to the intro page (likely the user refreshed).
    if (!this.props.image) {
      this.props.history.replace('/');
    }
  }
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
        <DownloadModal />
      </FullHeight>
    );
  }
}

const mapStateToProps = state => ({
  image: state.image,
});

export default connect(mapStateToProps)(Main);
