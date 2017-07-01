import React, {PureComponent} from 'react';
import styled from 'styled-components';
import SaveIcon from 'react-icons/lib/md/save';
import BackIcon from 'react-icons/lib/md/keyboard-backspace';

import {colors, styles,} from '../constants';

import Button from './Button';

const ReturnButton = Button.extend`
  width: 55px;
  font-size: 18px;
`;

const SaveButton = Button.extend`
  border-color: ${colors.greens[2]};
  color: ${colors.greens[2]};
  width: 55px;
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
  height: ${styles.headerHeightPx};
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

        <SaveButton>
          <IconAdjustment><SaveIcon /></IconAdjustment>
        </SaveButton>
      </TopBar>
    )
  }
}

export default TopControls;
