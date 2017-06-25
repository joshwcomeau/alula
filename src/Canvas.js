import React, { PureComponent } from 'react';
import styled from 'styled-components';

import createCanvasHistory from './utils/canvas-history';
import {
  scaleCanvas,
  getPixelRatio,
  getCroppedImageParams,
  mirrorTransformLine,
} from './utils/canvas-utils';


const CanvasElem = styled.canvas`
  position: relative;
  width: 100%;
  height: 100%;
  background: #CCC;
`;

class Canvas extends PureComponent {
  componentDidMount() {
    const size = Math.min(window.innerWidth, window.innerHeight);

    this.canvas.width = size;
    this.canvas.height = size;

    this.pixelRatio = getPixelRatio(this.ctx);

    scaleCanvas(this.canvas, this.ctx);

    // Items are added to the history when the mouse is released,
    // since that "officially" sets the state.
    this.history = createCanvasHistory();

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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    scaleCanvas(this.canvas, this.ctx);

    this.updateImage(this.props.image);
  }

  updateImage = (image) => {
    const canvasWidth = this.canvas.width / this.pixelRatio;
    const canvasHeight = this.canvas.height / this.pixelRatio;

    const croppedImageParams = getCroppedImageParams({
      canvasWidth,
      canvasHeight,
      imageWidth: image.width,
      imageHeight: image.height,
      pixelRatio: this.pixelRatio,
    });

    this.ctx.drawImage(
      image,
      ...croppedImageParams
    );

    // Push this onto the history.
    this.history.save(this.canvas);
  }

  startDrag = (ev) => {
    this.x1 = ev.clientX;
    this.y1 = ev.clientY;

    this.isDragging = true;
  }

  handleDrag = (ev) => {
    if (!this.isDragging) {
      return;
    }

    // At the start of each move event, restore the canvas to the previously
    // saved state. This is necessary because each move updates the canvas
    // as a 'preview'. The state isn't saved until the drag is released.
    this.history.restore(this.canvas, this.ctx);

    const {x1, y1} = this;
    const {clientX: x2, clientY: y2} = ev;

    const sideA = x2 - x1;
    const sideB = y2 - y1;

    // Extend our line so that it reaches the edge of the canvas.
    // Given that this is just a straight line, it can be represented by
    // the simple equation `y = ax + b`.
    // We can figure out the slope, `a`, pretty easily.
    const slope = sideB / sideA;
    // We can work out the offset `b` by solving the equation for one of our
    // known points.
    // y1 = slope * x1 + offset
    const offset = y1 - (slope * x1);

    // Now that we have this data, extend our line to span the entire canvas.
    const originLine = {
      x1: 0 * this.pixelRatio,
      y1: offset * this.pixelRatio,
      x2: this.canvas.width * this.pixelRatio,
      y2: (slope * this.canvas.width + offset) * this.pixelRatio,
    };

    this.ctx.save();

    this.ctx.setTransform(...mirrorTransformLine(originLine));

    // Create a path that only covers the reflected part of the line.
    this.ctx.beginPath();
    this.ctx.moveTo(originLine.x1, originLine.y1);
    this.ctx.lineTo(originLine.x2, originLine.y2);
    this.ctx.lineTo(this.canvas.width, 0);
    this.ctx.lineTo(0, 0);
    this.ctx.clip();

    // draw the image
    // since the this.ctx is rotated, the image will be rotated also
    this.ctx.drawImage(
      this.canvas,
      0,
      0,
    );

    // we’re done with the rotating so restore the unrotated this.ctx
    this.ctx.setTransform(1,0,0,1,0,0);

    this.ctx.restore();
  }

  releaseDrag = (ev) => {
    this.isDragging = false;

    this.history.save(this.canvas);
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
        onMouseMove={this.handleDrag}
        onMouseUp={this.releaseDrag}
      />
    );
  }
}

export default Canvas;
