import {OPEN_MODAL, CLOSE_MODAL} from '../actions';

const initialState = null;


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: return action.modal;
    case CLOSE_MODAL: return null;
    default: return state;
  }
}
