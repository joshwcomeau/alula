import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {receiveNewImage} from '../actions';
import {colors, styles} from '../constants';
import {loadImage} from '../utils/image.utils.js'

import IntroButton from './IntroButton';


class RandomImageSelector extends PureComponent {
  componentDidMount() {
    // Pre-emptively fetch the image, so that if the user selects "random",
    // it's already available.
    const size = Math.min(window.innerWidth, window.innerHeight);
    const url = `https://source.unsplash.com/random/${size}x${size}`;

    loadImage(url).then(image => {
      this.image = image;
    });
  }

  handleClick = () => {
    const {receiveNewImage, push} = this.props;

    receiveNewImage(this.image);
    push('/create');
  }

  render() {
    return (
      <IntroButton
        color={colors.purples[1]}
        borderColor={colors.purples[2]}
        style={{marginTop: styles.paddingUnitPx}}
        onClick={this.handleClick}
      >
        Use Random Photo
      </IntroButton>
    );
  }
}

const mapDispatchToProps = {receiveNewImage, push};

export default connect(null, mapDispatchToProps)(RandomImageSelector);
