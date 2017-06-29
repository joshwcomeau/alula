import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import createRouterMiddleware from '../middlewares/router.middleware.js';


export default function configureStore(history) {
  const routerMiddleware = createRouterMiddleware(history);

  return createStore(
    rootReducer,
    applyMiddleware(routerMiddleware)
  );
}
