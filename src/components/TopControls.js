import React, {PureComponent} from 'react';
import styled from 'styled-components';

import {colors} from '../constants';

const TopBar = styled.div`
  position: relative;
  height: 60px;
  padding: 5px 10px;
  background: ${colors.grays[4]};
  color: ${colors.grays[0]};
`;


class TopControls extends PureComponent {
  handleClear() {

  }

  handleSave() {

  }

  render() {
    return (
      <TopBar>
        Top!
      </TopBar>
    )
  }
}

export default TopControls;
