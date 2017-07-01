export const RECEIVE_NEW_IMAGE = 'RECEIVE_NEW_IMAGE';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';
export const APPLY_TRANSFORMATION = 'APPLY_TRANSFORMATION';
export const UNDO_TRANSFORMATION = 'UNDO_TRANSFORMATION';
export const ROTATE = 'ROTATE';

const createCanvasCopy = canvas => {
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

const getRadianAngle = degrees => degrees * Math.PI / 180;

export const receiveNewImage = image => ({
  type: RECEIVE_NEW_IMAGE,
  image,
});

export const clearImage = () => ({
  type: CLEAR_IMAGE,
});

export const applyTransformation = (canvas) => {
  return {
    type: APPLY_TRANSFORMATION,
    canvas: createCanvasCopy(canvas),
  };
}

export const undoTransformation = () => ({
  type: UNDO_TRANSFORMATION,
});

const rotate = (direction) => () => (
  (dispatch, getState) => {
    const state = getState();

    const canvas = state.history[state.history.length - 1];

    const newCanvas = createCanvasCopy(canvas);
    const newCtx = newCanvas.getContext('2d');

    console.log(direction)


    // NOTE: It feels kinda horrible to be doing this stuff here.
    // It's tricky, because the BottomControls component needs to update
    // the canvas contained in Canvas component.
    newCtx.save();
    newCtx.translate(
      direction === 'ccw' ? 0 : canvas.width,
      direction === 'cw' ? 0 : canvas.height
    );
    newCtx.rotate(
      direction === 'cw'
        ? getRadianAngle(90)
        : getRadianAngle(270)
    );

    newCtx.drawImage(canvas, 0, 0);

    newCtx.restore();

    dispatch({
      type: ROTATE,
      canvas: newCanvas,
    })
  }
);

export const rotateCW = rotate('cw');
export const rotateCCW = rotate('ccw');
