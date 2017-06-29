import React from 'react';
import styled from 'styled-components';

import {colors} from '../constants';

const Button = styled.button`
  position: relative;
  height: 50px;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  background: ${colors.blues[3]};
  color: ${colors.white};
`;


export default Button;
