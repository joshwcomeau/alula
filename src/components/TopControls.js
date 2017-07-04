import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BackIcon from 'react-icons/lib/md/keyboard-backspace';

import {clearImage} from '../actions';
import {colors, media, styles} from '../constants';

import Button from './Button';
import DownloadButton from './DownloadButton';
import {IconAdjustment} from './utility-components';


class TopControls extends PureComponent {
  static propTypes = {
    clearImage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  handleClear = () => {
    this.props.clearImage();
    this.props.push('/');
  }

  render() {
    return (
      <TopBar>
        <Button width={styles.buttonHeightPx} onClick={this.handleClear}>
          <IconAdjustment><BackIcon /></IconAdjustment>
        </Button>

        <Title>alula</Title>

        <DownloadButton width={styles.buttonHeightPx} />
      </TopBar>
    )
  }
}

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  letter-spacing: -2px;
  color: ${colors.white};
`;

const TopBar = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${styles.barHeightPx};
  padding: 0 ${styles.paddingUnitPx};
  background: ${styles.backgroundColor};
  border-bottom: 1px solid rgba(255,255,255,0.05);

  ${media.xs`
    height: ${styles.barHeightXSPx};
  `}
`;

export default connect(null, {clearImage, push})(TopControls);
