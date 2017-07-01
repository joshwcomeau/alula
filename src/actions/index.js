export const RECEIVE_NEW_IMAGE = 'RECEIVE_NEW_IMAGE';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';
export const APPLY_TRANSFORMATION = 'APPLY_TRANSFORMATION';
export const UNDO_TRANSFORMATION = 'UNDO_TRANSFORMATION';

export const receiveNewImage = image => ({
  type: RECEIVE_NEW_IMAGE,
  image,
});

export const clearImage = () => ({
  type: CLEAR_IMAGE,
});

export const applyTransformation = (canvas) => {
  //create a new canvas
  const newCanvas = document.createElement('canvas');
  const newContext = newCanvas.getContext('2d');

  //set dimensions
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;

  //apply the old canvas to the new one
  newContext.drawImage(canvas, 0, 0);

  return {
    type: APPLY_TRANSFORMATION,
    canvas: newCanvas,
  };
}

export const undoTransformation = () => ({
  type: UNDO_TRANSFORMATION,
});
