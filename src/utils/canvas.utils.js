// Figure out our backing scale.
// This ensures canvas looks crisp on retina displays, where there are
// in fact 4 on-screen pixels for every 1 calculated pixel.
export function scaleCanvas(canvas, ctx) {
  const ratio = getPixelRatio(ctx);

  if (ratio === 1) {
    return;
  }

  /* eslint-disable no-param-reassign */
  canvas.style.height = canvas.height + 'px';
  canvas.style.width = canvas.width + 'px';
  canvas.width *= ratio;
  canvas.height *= ratio;
  /* eslint-enable */

  ctx.scale(ratio, ratio);
}

export function getPixelRatio(ctx) {
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                            ctx.mozBackingStorePixelRatio ||
                            ctx.backingStorePixelRatio ||
                            1;

  return (window.devicePixelRatio || 1) / backingStoreRatio;
}

export function getCursorPosition(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return {x, y};
}

export function getCroppedImageParams({
  canvasWidth,
  canvasHeight,
  imageWidth,
  imageHeight,
  pixelRatio,
}) {
  const canvasAspectRatio = canvasWidth / canvasHeight;
  const imageAspectRatio = imageWidth / imageHeight;

  let scaleWidth, scaleHeight, offset;

  if (canvasAspectRatio > imageAspectRatio) {
    scaleWidth = canvasWidth;
    scaleHeight = scaleWidth / imageAspectRatio;
    const amountCropped = scaleHeight - canvasHeight;
    offset = {x: 0, y: (-amountCropped / pixelRatio)};
  } else {
    scaleHeight = canvasHeight;
    scaleWidth = scaleHeight * imageAspectRatio;
    const amountCropped = scaleWidth - canvasWidth;
    offset = {x: (-amountCropped / pixelRatio), y: 0};
  }

  return [offset.x, offset.y, scaleWidth, scaleHeight];
}

export function createCanvasCopy(canvas) {
  //create a new canvas
  const newCanvas = document.createElement('canvas');
  const newContext = newCanvas.getContext('2d');

  //set dimensions
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;

  //apply the old canvas to the new one
  newContext.drawImage(canvas, 0, 0);

  return newCanvas;
}


export function mirrorTransformLine(line){
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
  return [axx, axy, axy, -axx, mox, moy];
}
