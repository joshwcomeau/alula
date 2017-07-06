// Handle uploading images to our server, when the user saves the image for
// themselves.
import {CLICK_DOWNLOAD_BUTTON, RIGHT_CLICK_CANVAS} from '../actions';
import {getCurrentCanvas} from '../reducers/history.reducer';


export default store => next => action => {
  switch (action.type) {
    case CLICK_DOWNLOAD_BUTTON:
    case RIGHT_CLICK_CANVAS: {
      const canvas = getCurrentCanvas(store.getState());
      const imageData = canvas.toDataURL('image/png');

      const fetchParams = {
        method: 'POST',
        body: JSON.stringify({ file: imageData }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };

      fetch('/save', fetchParams)
        .then(res => res.json())
        .then(json => console.log('Got response', json))
        .catch(console.error);
    }

    default:
      break;
  }

  return next(action);
}
