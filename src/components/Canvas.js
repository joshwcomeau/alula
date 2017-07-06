import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  applyTransformation,
  undoTransformation,
  rightClickCanvas,
} from '../actions';
import {getCurrentCanvas} from '../reducers/history.reducer';
import {disableEventOnMobile} from '../utils/event.utils';
import {
  scaleCanvas,
  getPixelRatio,
  getCursorPosition,
  getCroppedImageParams,
  mirrorTransformLine,
} from '../utils/canvas.utils';


const CanvasElem = styled.canvas`
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  background: #CCC;
`;

class Canvas extends PureComponent {
  static propTypes = {
    image: PropTypes.object,
  }

  componentDidMount() {
    // Make the image a square, based on the largest dimension (either
    // full-width or full-height)
    const size = Math.min(window.innerWidth, window.innerHeight);

    this.canvas.width = size;
    this.canvas.height = size;

    this.pixelRatio = getPixelRatio(this.ctx);

    this.ctx.imageSmoothingEnabled = false;

    scaleCanvas(this.canvas, this.ctx);

    if (this.props.image) {
      this.updateImage(this.props.image);
      this.props.applyTransformation(this.canvas);
    }
  }

  componentWillReceiveProps(nextProps) {
    const newImageSelected = nextProps.image !== this.props.image;
    const newTransformationReceived = nextProps.canvas !== this.props.canvas;

    if (newImageSelected) {
      this.updateImage(nextProps.image);
      this.props.applyTransformation(this.canvas);
    }

    if (newTransformationReceived) {
      this.updateImage(nextProps.canvas);
    }
  }

  updateImage = (image, callback) => {
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
  }

  getEventCoords = (ev) => {
    // This method normalizes the difference between touch events and mouse
    // events, to return a set of X/Y coordinates for an event regardess
    // of input device.
    const coordHolder = ev.touches ? ev.touches[0] : ev;

    try {
      getCursorPosition(coordHolder, this.canvas)
    } catch (e) {
      alert(e);
    }

    return getCursorPosition(coordHolder, this.canvas);
  }

  startDrag = (ev) => {
    disableEventOnMobile(ev);

    // If the user right-clicks, we don't want to do any mirroring.
    // We _do_ want to signal this intent, though, since there's a good
    // chance it means they're done and are saving the image.
    if (ev.button === 2) {
      this.props.rightClickCanvas();
      return;
    }

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
    this.ctx.drawImage(
      this.props.canvas,
      0,
      0,
      this.canvas.width / this.pixelRatio,
      this.canvas.height / this.pixelRatio,
    );

    this.ctx.save();


    const {x1, y1} = this;
    const {x: x2, y: y2} = this.getEventCoords(ev);

    const sideA = x2 - x1;
    const sideB = y2 - y1;

    let fullLine;

    // If our line is perfectly vertical, the standard `ax + b` form won't
    // work. In this case, though, our job is easy.
    if (sideA === 0) {
      const x = x1;

      fullLine = {
        x: x1 * this.pixelRatio,
        y1: 0,
        y2: this.canvas.height,
      };

      this.ctx.setTransform(-1, 0, 0, 1, x * this.pixelRatio * 2, 0)

      this.ctx.beginPath();
      this.ctx.moveTo(fullLine.x, 0);
      this.ctx.lineTo(fullLine.x, this.canvas.height);
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.lineTo(this.canvas.width, 0);
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
    disableEventOnMobile(ev);

    this.isDragging = false;

    this.props.applyTransformation(this.canvas);
    // this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    // this.ctx.rotate(true ? -Math.PI / 2 : Math.PI / 2);

  }

  storeRefToCanvas = (canvas) => {
    // If the component unmounts before the ref can be stored,
    // bail early.
    if (!canvas) {
      return;
    }

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

const mapStateToProps = state => ({
  image: state.image,
  canvas: getCurrentCanvas(state),
});

const mapDispatchToProps = {
  applyTransformation,
  undoTransformation,
  rightClickCanvas,
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
