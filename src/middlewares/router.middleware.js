export default function createRouterMiddleware(history) {
  return store => next => action => {
    console.log('stuff', store, next, action);
    if (action.meta && action.meta.router) {
      console.log('Going to', history, action.meta.router.url)
      history.push(action.meta.router.url);
    }

    return next(action);
  }
}
