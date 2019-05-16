import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import vendors from './vendors';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  simpleReducer,
  vendors
});