import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import { createBrowserHistory } from 'history';
import { compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
// import { connectRouter, routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer(history),
    preloadedState,
    composedEnhancers
  );
}