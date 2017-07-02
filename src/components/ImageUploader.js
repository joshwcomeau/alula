import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux'
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {receiveNewImage} from '../actions';
import {colors, styles} from '../constants';
import {readAsDataURL, loadImage} from '../utils/image.utils.js'

import IntroButton from './IntroButton';
import Spinner from './Spinner';


export class ImageUploader extends PureComponent {
  state = {
    loading: false,
  }

  static propTypes = {
    defaultImageSrc: PropTypes.string,
    receiveNewImage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  handleUpload = (file) => {
    this.setState({ loading: true });
    readAsDataURL(file).then(this.processImage);
  }

  processImage = (src) => {
    const {receiveNewImage, push} = this.props;

    loadImage(src).then((image) => {
      this.setState({ loading: false })
      receiveNewImage(image);
      push('/create');
    }).catch(console.error);
  }

  render() {
    const {loading} = this.state;

    return (
      <Container>
        <input
          type="file"
          onChange={ev => this.handleUpload(ev.target.files[0])}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            opacity: 0,
          }}
        />
        <IntroButton
          color={colors.pinks[1]}
          borderColor={colors.pinks[2]}
          style={{marginBottom: styles.paddingUnitPx}}
        >
          {loading
            ? <Spinner size={14} color={colors.pinks[1]} />
            : "Select Photo"
          }
        </IntroButton>
      </Container>
    )
  }
}

const Container = styled.div`
  positon: relative;
`

const mapDispatchToProps = {receiveNewImage, push};

export default connect(null, mapDispatchToProps)(ImageUploader);
