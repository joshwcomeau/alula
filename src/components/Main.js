import React, { Component } from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {colors, styles} from '../constants';

import TopControls from './TopControls';
import BottomControls from './BottomControls';
import Canvas from './Canvas';
import DownloadModal from './DownloadModal';
import {
  Column,
  Row,
  Flexed,
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
        <PortraitColumn>
          <TopControls />
          <Canvas />
          <BottomControls />
        </PortraitColumn>
        <DownloadModal />
      </PortraitOnly>
    )
  }

  renderLandscape() {
    return (
      <LandscapeOnly>
        <Row>
          <Column style={{ flex: 1 }}>
            <TopControls />
            <LandscapeAdditionalContent>
              <span>
                <LandscapeHeading>Make some art.</LandscapeHeading>
                <LandscapeParagraph>
                  Mirror the photo by clicking and dragging a line with your mouse.
                </LandscapeParagraph>
                <LandscapeParagraph>
                  Right-click and "Save as" to save your work :)
                </LandscapeParagraph>
              </span>
            </LandscapeAdditionalContent>
            <BottomControls />
          </Column>
          <Canvas />
        </Row>
      </LandscapeOnly>
    )
  }

  render() {
    return (
      <Wrapper>
        {this.renderPortrait()}
        {this.renderLandscape()}
      </Wrapper>
    );
  }
}

const Wrapper = FullHeight.extend`
  background-color: ${colors.grays[5]};
`;

const PortraitColumn = Column.extend`
  min-height: 100%;
  justify-content: space-between;
`;

const LandscapeAdditionalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  color: ${colors.white};
  padding: ${styles.paddingUnit * 2}px;
`;

const LandscapeHeading = styled.h2`
  font-size: 24px;
  margin-bottom: ${styles.paddingUnitPx};
  color: ${colors.pinks[1]};
`;

const LandscapeParagraph = styled.p`
  max-width: 400px;
  line-height: 1.4;
  margin-bottom: ${styles.paddingUnitPx};
`;

const mapStateToProps = state => ({
  image: state.image,
});

export default connect(mapStateToProps)(Main);
