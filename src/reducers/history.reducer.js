import {APPLY_TRANSFORMATION, UNDO_TRANSFORMATION} from '../actions';

const initialState = [];

// This reducer holds an array of canvases.
//
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case APPLY_TRANSFORMATION: return [...state, action.canvas];
    case UNDO_TRANSFORMATION: return state.slice(0, -1);
    default: return state;
  }
}
