import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ImageUploader from './ImageUploader';


class Intro extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        Hello there!

        <ImageUploader />
      </div>
    )
  }
}

export default Intro;
