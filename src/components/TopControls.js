import React, {PureComponent} from 'react';
import styled from 'styled-components';
import SaveIcon from 'react-icons/lib/md/save';
import BackIcon from 'react-icons/lib/md/keyboard-backspace';

import {colors} from '../constants';

import Button from './Button';

const ReturnButton = Button.extend`
  background: ${colors.grays[4]};
  width: 55px;
  font-size: 18px;
`;

const SaveButton = Button.extend`
  background: ${colors.greens[2]};
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
  height: 60px;
  padding: 0 14px;
  background: ${colors.white};
  box-shadow: 0px 1px 1px rgba(0,0,0,0.15);
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
