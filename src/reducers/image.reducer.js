import {RECEIVE_NEW_IMAGE, CLEAR_IMAGE} from '../actions';

const initialState = null;

// TODO: This reducer holds an HTML node (<img>). It should probably just
// hold a base64 encoded string or something instead.

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_NEW_IMAGE: return action.image;
    case CLEAR_IMAGE: return null;
    default: return state;
  }
}
