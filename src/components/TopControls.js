import React, {PureComponent} from 'react';
import styled from 'styled-components';
import SaveIcon from 'react-icons/lib/md/save';
import BackIcon from 'react-icons/lib/md/keyboard-backspace';

import {colors, styles} from '../constants';

import Button from './Button';

const ReturnButton = Button.extend`
  width: ${styles.buttonHeightPx};
  height: ${styles.buttonHeightPx};
  font-size: 18px;
`;

const SaveButton = Button.extend`
  border-color: ${colors.greens[2]};
  color: ${colors.greens[2]};
  width: ${styles.buttonHeightPx};
  height: ${styles.buttonHeightPx};
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  letter-spacing: -2px;
  color: ${colors.white};
`;

const IconAdjustment = styled.span`
  display: inline-block;
  transform: translateY(-1px);
`

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
  handleClear() {

  }

  handleSave() {

  }

  render() {
    return (
      <TopBar>
        <ReturnButton>
          <IconAdjustment><BackIcon /></IconAdjustment>
        </ReturnButton>

        <Title>Aztec</Title>

        <SaveButton>
          <IconAdjustment><SaveIcon /></IconAdjustment>
        </SaveButton>
      </TopBar>
    )
  }
}

export default TopControls;
