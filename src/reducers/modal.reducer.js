import {CLICK_DOWNLOAD_BUTTON, CLOSE_MODAL} from '../actions';

const initialState = null;


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CLICK_DOWNLOAD_BUTTON: return 'download';
    case CLOSE_MODAL: return null;
    default: return state;
  }
}
