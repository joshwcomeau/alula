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
    // Items are added to the history when the mouse is released,
    // since that "officially" sets the state.
    this.history = createCanvasHistory();

    this.ctx.imageSmoothingEnabled = false;

    this.handleResize();
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
    const size = Math.min(window.innerWidth, window.innerHeight);

    this.canvas.width = size;
    this.canvas.height = size;

    this.pixelRatio = getPixelRatio(this.ctx);

    scaleCanvas(this.canvas, this.ctx);

    if (this.props.image) {
      this.updateImage(this.props.image);
    }
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

  getEventCoords = (ev) => {
    // This method normalizes the difference between touch events and mouse
    // events, to return a set of X/Y coordinates for an event regardess
    // of input device.
    const coordHolder = ev.touches ? ev.touches[0] : ev;

    return {
      x: coordHolder.clientX,
      y: coordHolder.clientY
    }
  }

  startDrag = (ev) => {
    const {x: x1, y: y1} = this.getEventCoords(ev);
    this.x1 = x1;
    this.y1 = y1;

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

    this.ctx.save();


    const {x1, y1} = this;
    const {x: x2, y: y2} = this.getEventCoords(ev);

    const sideA = x2 - x1;
    const sideB = y2 - y1;

    let fullLine;

    // If our line is perfectly vertical, the standard `ax + b` form won't
    // work. In this case, though, our job is easy.
    if (sideA === 0) {
      fullLine = {
        x1: x1 * this.pixelRatio,
        y1: 0,
        x2: x2 * this.pixelRatio,
        y2: this.canvas.height,
      };

      console.log('Setting transform')
      this.ctx.translate(this.canvas.width / this.pixelRatio, 0);
      this.ctx.scale(-1 / this.pixelRatio, 1 / this.pixelRatio);

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvas.width - fullLine.x1, 0);
      this.ctx.lineTo(this.canvas.width - fullLine.x2, this.canvas.height);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.lineTo(0, 0);
      this.ctx.lineTo(this.canvas.width - fullLine.x1, 0);
    } else {
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
      fullLine = {
        x1: 0 * this.pixelRatio,
        y1: offset * this.pixelRatio,
        x2: this.canvas.width * this.pixelRatio,
        y2: (slope * this.canvas.width + offset) * this.pixelRatio,
      };

      this.ctx.setTransform(...mirrorTransformLine(fullLine));

      this.ctx.beginPath();
      this.ctx.moveTo(fullLine.x1, fullLine.y1);
      this.ctx.lineTo(fullLine.x2, fullLine.y2);
      this.ctx.lineTo(this.canvas.width, 0);
      this.ctx.lineTo(0, 0);
    }

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

    console.log('Release drag');
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
        onTouchStart={this.startDrag}
        onTouchMove={this.handleDrag}
        onTouchEnd={this.releaseDrag}
      />
    );
  }
}

export default Canvas;
