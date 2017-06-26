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

    const {x1, y1} = this;
    const {x: x2, y: y2} = this.getEventCoords(ev);

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
    // This is a surprisingly tricky thing, since the "side" we want to clip
    // depends on the current line's two points (we generally want to reflect
    // over the smaller of the two sides bisected by this line).
    //
    // First, figure out which direction is shorter, clockwise or counter-cw.
    function calculatePerimeter(args) {
      const {originalPoint, currentPoint, direction, size, sum = 0} = args;

      // Are we on the same axis as our final point?
      if (direction === 'ccw') {
        if (
          currentPoint.x === 0 && currentPoint.y === 0 &&
          originalPoint.x === 0
        ) {
          return sum + originalPoint.y;
        }

        if (
          currentPoint.x === 0 && currentPoint.y === size &&
          originalPoint.y === size
        ) {
          return sum + originalPoint.x;
        }

        if (
          currentPoint.x === size && currentPoint.y === 0 &&
          originalPoint.y === 0
        ) {
          return sum + (size - originalPoint.x);
        }
      } else {
        if (
          currentPoint.x === 0 && currentPoint.y === size &&
          originalPoint.x === 0
        ) {
          return sum + (size - originalPoint.y);
        }

        if (
          currentPoint.x === size && currentPoint.y === size &&
          originalPoint.y === size
        ) {
          return sum + (size - originalPoint.x);
        }

        if (
          currentPoint.x === 0 && currentPoint.y === 0 &&
          originalPoint.y === 0
        ) {
          return sum + originalPoint.x;
        }
      }

      // If not, add the size to our sum, and move the currentPoint to
      // the next corner.
      const corners = [
        { x: 0, y: 0 },
        { x: size, y: 0 },
        { x: size, y: size },
        { x: 0, y: size },
      ];

      return calculatePerimeter({
        ...args,
      })
    }

    // this.ctx.beginPath();
    // this.ctx.moveTo(originLine.x1, originLine.y1);
    // this.ctx.lineTo(originLine.x2, originLine.y2);
    // this.ctx.lineTo(this.canvas.width, 0);
    // this.ctx.lineTo(0, 0);
    //
    // this.ctx.clip();

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
