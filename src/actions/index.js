import {createCanvasCopy} from '../utils/canvas.utils';
import {getRadianAngle} from '../utils/geometry.utils';


export const RECEIVE_NEW_IMAGE = 'RECEIVE_NEW_IMAGE';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';
export const APPLY_TRANSFORMATION = 'APPLY_TRANSFORMATION';
export const UNDO_TRANSFORMATION = 'UNDO_TRANSFORMATION';
export const RESTORE_ORIGINAL_IMAGE = 'RESTORE_ORIGINAL_IMAGE';
export const CLICK_DOWNLOAD_BUTTON = 'CLICK_DOWNLOAD_BUTTON';
export const RIGHT_CLICK_CANVAS = 'RIGHT_CLICK_CANVAS';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const ROTATE = 'ROTATE';


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

export const restoreOriginalImage = () => ({
  type: RESTORE_ORIGINAL_IMAGE,
});

export const clickDownloadButton = () => ({
  type: CLICK_DOWNLOAD_BUTTON,
});

export const rightClickCanvas = () => ({
  type: RIGHT_CLICK_CANVAS,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

const rotate = (direction) => () => (
  (dispatch, getState) => {
    const state = getState();
    const canvas = state.history[state.history.length - 1];

    const newCanvas = createCanvasCopy(canvas);
    const newCtx = newCanvas.getContext('2d');

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
