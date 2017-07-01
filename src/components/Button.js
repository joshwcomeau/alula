import React from 'react';
import styled from 'styled-components';

import {colors} from '../constants';

const Button = styled.button`
  position: relative;
  height: 40px;
  padding: 0;
  border-radius: 2px;
  border-width: 2px;
  border-style: solid;
  border-color: ${colors.grays[3]};
  font-size: 18px;
  font-weight: 400;
  background: rgba(0,0,0,0.5);
  color: ${colors.grays[2]};

  &:disabled {
    opacity: 0.5;
  }
`;


export default Button;
