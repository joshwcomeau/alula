import React, {PureComponent} from 'react';
import styled from 'styled-components';
import BackIcon from 'react-icons/lib/md/keyboard-backspace';

import {colors, styles} from '../constants';

import Button from './Button';
import DownloadButton from './DownloadButton';
import {IconAdjustment} from './utility-components';

const ReturnButton = Button.extend`
  width: ${styles.buttonHeightPx};
  height: ${styles.buttonHeightPx};
  font-size: 18px;
`;

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
`;


class TopControls extends PureComponent {
  render() {
    return (
      <TopBar>
        <ReturnButton>
          <IconAdjustment><BackIcon /></IconAdjustment>
        </ReturnButton>

        <Title>Aztec</Title>

        <DownloadButton />
      </TopBar>
    )
  }
}

export default TopControls;
