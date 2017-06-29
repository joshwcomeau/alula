import { createStore, applyMiddleware, compose } from 'redux';
import Perf from 'react-addons-perf';

import rootReducer from '../reducers';
import createRouterMiddleware from '../middlewares/router.middleware.js';
import DevTools from '../components/DevTools';


window.Perf = Perf;

export default function configureStore(history) {
  const routerMiddleware = createRouterMiddleware(history);

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(routerMiddleware),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
