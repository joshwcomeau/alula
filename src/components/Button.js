import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {colors, media, styles} from '../constants';

class Button extends Component {
  static propTypes = {
    width: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    borderColor: PropTypes.string,
    fill: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    width: 'auto',
    color: colors.grays[2],
    borderColor: colors.grays[3],
    fill: false,
  }

  componentDidMount() {
    this.button.addEventListener('touchend', event => {
      event.preventDefault();
      this.button.click();
    });
  }

  render() {
    const {width, color, borderColor, fill, ...delegated} = this.props;

    const ButtonElem = BaseButtonElem.extend`
      width: ${width};
      border-width: ${fill ? '0px' : '2px'};
      border-color: ${fill ? 'none' : borderColor};
      background: ${fill ? color : 'rgba(0,0,0,0.5)'};
      color: ${fill ? colors.white : color}
    `;

    return (
      <ButtonElem
        innerRef={elem => this.button = elem}
        {...delegated}
      />
    );
  }
}

const BaseButtonElem = styled.button`
  position: relative;
  height: ${styles.buttonHeightPx};
  padding: 0;
  border-radius: 2px;
  border-style: solid;
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


export default Button;
