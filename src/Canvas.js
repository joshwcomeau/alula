import React, { PureComponent } from 'react';
import styled from 'styled-components';
import debounce from 'lodash';

const CanvasElem = styled.canvas`
  position: relative;
  width: 100%;
  height: 100%;
  background: #CCC;
`;

class Canvas extends PureComponent {
  componentDidMount() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.updateImage(nextProps.image);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    console.log('Debouncing')
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.updateImage(this.props.image);
  }

  updateImage = (image) => {
    const canvasAspectRatio = this.canvas.width / this.canvas.height;
    const imageAspectRatio = image.width / image.height;

    let scaleWidth, scaleHeight, amountCropped, offset;
    if (canvasAspectRatio > imageAspectRatio) {
      scaleWidth = this.canvas.width;
      scaleHeight = this.canvas.width / imageAspectRatio;
      amountCropped = scaleHeight - this.canvas.height;
      offset = [0, -amountCropped / 2];
    } else {
      scaleHeight = this.canvas.height;
      scaleWidth = this.canvas.height * imageAspectRatio;
      amountCropped = scaleWidth - this.canvas.width;
      offset = [-amountCropped / 2, 0];
    }

    console.log(image, this.canvas.width, this.canvas.height)

    this.ctx.drawImage(image, ...offset, scaleWidth, scaleHeight);
  }


  storeRefToCanvas = (canvas) => {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  render() {
    return (
      <CanvasElem innerRef={this.storeRefToCanvas}>

      </CanvasElem>
    );
  }
}

export default Canvas;
