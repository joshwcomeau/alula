import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ImageUploader from './ImageUploader';


const Title = styled.h1`
  font-size: 72px;
  font-weight: bold;
  letter-spacing: -2px;
`;
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
