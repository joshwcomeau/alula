import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import Perf from 'react-addons-perf';

import rootReducer from '../reducers';
import uploadMiddleware from '../middlewares/upload.middleware';
import DevTools from '../components/DevTools';


window.Perf = Perf;

export default function configureStore(history) {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(routerMiddleware(history), thunk, uploadMiddleware),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
