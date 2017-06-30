import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import Perf from 'react-addons-perf';

import rootReducer from '../reducers';
import DevTools from '../components/DevTools';


window.Perf = Perf;

export default function configureStore(history) {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(routerMiddleware(history)),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
