import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers';


export default function configureStore(history) {
  return createStore(
    rootReducer,
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
