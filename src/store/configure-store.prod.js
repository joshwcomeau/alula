import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux'

import rootReducer from '../reducers';


export default function configureStore(history) {
  const routerMiddleware = createRouterMiddleware(history);

  return createStore(
    rootReducer,
    applyMiddleware(routerMiddleware(history))
  );
}
