import React, {PureComponent} from 'react';
import styled from 'styled-components';

import {colors} from '../constants';

import IntroButton from './IntroButton';


class RandomImageSelector extends PureComponent {
  render() {
    return (
      <IntroButton color={colors.purples[1]} borderColor={colors.purples[2]}>
        Use Random Photo
      </IntroButton>
    )
  }
}

export default RandomImageSelector;
