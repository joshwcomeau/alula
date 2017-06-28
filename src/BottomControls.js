import React, {PureComponent} from 'react';
import styled from 'styled-components';

import {colors} from './constants';

const TopBar = styled.div`
  position: relative;
  height: 60px;
  padding: 5px 10px;
  background: ${colors.grays[4]};
  color: ${colors.grays[0]};
  flex: 1;
`;


class BottomControls extends PureComponent {
  handleClear() {

  }

  handleSave() {

  }

  render() {
    return (
      <TopBar>
        Bttom!
      </TopBar>
    )
  }
}

export default BottomControls;
