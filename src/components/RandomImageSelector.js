import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import {receiveNewImage} from '../actions';
import {colors, styles} from '../constants';
import {loadImage} from '../utils/image.utils.js'

import IntroButton from './IntroButton';
import Spinner from './Spinner';


class RandomImageSelector extends PureComponent {
  state = {
    waitingOnLoad: false,
  }

  static propTypes = {
    receiveNewImage: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const visibleSize = Math.min(window.innerWidth, window.innerHeight);
    this.size = visibleSize * window.devicePixelRatio;

    // Pre-emptively fetch the image, so that if the user selects "random",
    // it's already available.
    this.loadRandomImage();
  }

  loadRandomImage = () => {
    const date = new Date();
    const url = `/random-photo?size=${this.size}&d=${date}`;

    this.loadPromise = loadImage(url).then(image => {
      this.image = image;
    });
  }

  handleClick = () => {
    const {receiveNewImage, push} = this.props;

    this.setState({ waitingOnLoad: true });

    this.loadPromise.then(() => {
      this.setState({
        waitingOnLoad: false,
      });

      receiveNewImage(this.image);
      push('/create');
    });
  }

  render() {
    const {waitingOnLoad} = this.state;

    return (
      <IntroButton
        color={colors.purples[1]}
        borderColor={colors.purples[2]}
        style={{marginTop: styles.paddingUnitPx}}
        onClick={this.handleClick}
      >
        {waitingOnLoad
          ? <Spinner size={14} color={colors.purples[1]} />
          : "Use Random Photo"
        }
      </IntroButton>
    );
  }
}

const mapDispatchToProps = {receiveNewImage, push};

export default connect(null, mapDispatchToProps)(RandomImageSelector);
