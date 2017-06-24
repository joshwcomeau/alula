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

    if (canvasAspectRatio > imageAspectRatio) {
      this.scaleWidth = this.canvas.width;
      this.scaleHeight = this.canvas.width / imageAspectRatio;
      const amountCropped = this.scaleHeight - this.canvas.height;
      this.offset = {x: 0, y: -amountCropped / 2};
    } else {
      this.scaleHeight = this.canvas.height;
      this.scaleWidth = this.canvas.height * imageAspectRatio;
      const amountCropped = this.scaleWidth - this.canvas.width;
      this.offset = {x: -amountCropped / 2, y: 0};
    }

    console.log(image, this.canvas.width, this.canvas.height)

    this.ctx.drawImage(
      image,
      this.offset.x,
      this.offset.y,
      this.scaleWidth,
      this.scaleHeight
    );
  }

  startDrag = (ev) => {
    this.x1 = ev.clientX;
    this.y1 = ev.clientY;
  }

  releaseDrag = (ev) => {
    const {x1, y1} = this;
    const {clientX: x2, clientY: y2} = ev;
    const {image} = this.props;

    // Trigonometry time!
    // We started the drag at point (x1, y1), and have released at (x2, y2).
    // We can form a triangle from those two points (the line between them
    // is the hypotenuse.).
    //                 . (x2, y2)
    //                 |
    //  . (x1, y1)     | - Side B
    //  ---------------
    //     |_ Side A
    //
    // Angle theta (amount rotated from horizontal axis) is equal to:
    // theta = tan-1(B / A)
    //
    // This angle will be the amount we rotate, after mirroring over the
    // horizontal axis.

    const sideA = x2 - x1;
    const sideB = y2 - y1;

    const theta = Math.atan(sideB / sideA);

    // Let's draw our newly-rotated image!
    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    this.ctx.save();

    // move to the center of the canvas
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    // rotate the canvas to the specified degrees
    this.ctx.rotate(theta);

    // draw the image
    // since the this.ctx is rotated, the image will be rotated also
    this.ctx.drawImage(
      this.canvas,
      -this.canvas.width/2,
      -this.canvas.width/2,
    );

    // we’re done with the rotating so restore the unrotated this.ctx
    this.ctx.restore();
  }


  storeRefToCanvas = (canvas) => {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  render() {
    return (
      <CanvasElem
        innerRef={this.storeRefToCanvas}
        onMouseDown={this.startDrag}
        onMouseUp={this.releaseDrag}
      />
    );
  }
}

export default Canvas;
