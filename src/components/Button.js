import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {colors, media, styles} from '../constants';


const Button = styled.button`
  position: relative;
  height: ${styles.buttonHeightPx};
  width: ${props => props.width};
  padding: 0;
  border-radius: 2px;
  border-width: ${props => props.fill ? '0px' : '2px'};
  border-style: solid;
  border-color: ${props => props.fill ? 'none' : props.borderColor};
  background: ${props => props.fill ? props.color : 'rgba(0,0,0,0.5)'};
  color: ${props => props.fill ? colors.white : props.color};
  font-size: 18px;
  font-weight: 400;
  outline: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }

  ${media.xs`
    height: ${styles.buttonHeightXSPx};
  `}
`;

Button.defaultProps = {
  width: 'auto',
  color: colors.grays[2],
  borderColor: colors.grays[3],
  fill: false,
}

export default Button;
