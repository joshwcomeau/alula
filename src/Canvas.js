import React, { PureComponent } from 'react';
import styled from 'styled-components';
import debounce from 'lodash';

import createCanvasHistory from './utils/canvas-history';
import {scaleCanvas, getPixelRatio} from './utils/canvas-utils';


const CanvasElem = styled.canvas`
  position: relative;
  width: 100%;
  height: 100%;
  background: #CCC;
`;


function mirrorTransformLine(line, ctx){
  let {x1, y1, x2, y2} = line;
  // to save some messing about with signs,
  // make the line always from left to right
  if (x1 > x2) {
    x2 = line.x1;
    y2 = line.y1;
    x1 = line.x2;
    y1 = line.y2;
  }
  var x = x2-x1;  // get the vector from line start to end
  var y = y2-y1;
  var ox = -x1;  // get vector from line start to origin
  var oy = -y1;
  var len = Math.hypot(x, y); // get the length of the line
  var nx = x / len;  // normalise the line
  var ny = y / len;


  // We must find the mirrored origin
  // get the unit distance along the line where the mirrored y axis intercepts
  var u = (ox * x + oy * y)/(y * y + x * x);
  var dx = u * len; // get the x dist of the mirrored origin
  var dy = Math.hypot(x1 + x * u, y1 + y * u); // get the mirrored y axis distance from line

  console.log({ u, dx, dy })

  // the above code does not account for the direction of the origin. We don't know if its above or below the line
  // we can get the cross product of the mirror line and the vector to the origin. This will give us the sign (direction) to the origin
  dy *=  Math.sign(ox * y - oy * x); // flip the y distance if needed
  // calculate the  the location of the mirrored origin
  var mox = dx * nx - dy * ny + x1;
  var moy = dx * ny + dy * nx + y1;


  // Find the angle of the line to the x axis
  // var cross = 1 * ny - 0 * nx; // cross product give the sin of the angle between the line and the x axis
  // As the cross product is with 1,0 we can simplify
  var ang = Math.asin(ny); // with ny the cross product

  // now find the mirrored angle which is 2 times the angle to the x axis
  // use that angle to get the new x axis
  var axx = Math.cos(ang*2);
  var axy = Math.sin(ang*2);

  // this represents the x axis of the transform
  // you would normally rotate it clockwise 90 for the y axis
  // to mirror its anticlockwise
  ctx.setTransform(axx,axy,axy,-axx,mox,moy);
}

class Canvas extends PureComponent {
  componentDidMount() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

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

    const canvasAspectRatio = canvasWidth / canvasHeight;
    const imageAspectRatio = image.width / image.height;

    if (canvasAspectRatio > imageAspectRatio) {
      this.scaleWidth = canvasWidth;
      this.scaleHeight = this.scaleWidth / imageAspectRatio;
      const amountCropped = this.scaleHeight - canvasHeight;
      this.offset = {x: 0, y: (-amountCropped / 2)};
    } else {
      this.scaleHeight = canvasHeight;
      this.scaleWidth = this.scaleHeight * imageAspectRatio;
      const amountCropped = this.scaleWidth - canvasWidth;
      this.offset = {x: (-amountCropped / 2), y: 0};
    }

    this.ctx.drawImage(
      image,
      this.offset.x,
      this.offset.y,
      this.scaleWidth,
      this.scaleHeight
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

    this.history.restore(this.canvas, this.ctx);

    const {x1, y1} = this;
    const {image} = this.props;
    const {clientX: x2, clientY: y2} = ev;

    // At the start of each move event, restore the canvas to the previously
    // saved state. This is necessary because each move updates the canvas
    // as a 'preview'. The state isn't saved until the drag is released.
    // this.history.restore(this.canvas, this.ctx);

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

    mirrorTransformLine(originLine, this.ctx);

    // // Let's draw our newly-rotated image!
    // // save the unrotated context of the canvas so we can restore it later
    // // the alternative is to untranslate & unrotate after drawing
    //
    // // move to the center of the canvas
    // this.ctx.translate(canvasWidth / 2, this.canvas.height / 2);
    //
    // this.ctx.setTransform(
    //     -1, 0, // set the direction of x axis
    //     0, 1,   // set the direction of y axis
    //     canvasWidth, // set the x origin
    //     0    // set the y origin
    // );
    //
    // // rotate the canvas to the specified degrees
    // this.ctx.rotate(theta);

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
    this.ctx.setTransform(2,0,0,2,0,0);

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
