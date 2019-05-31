import { combineReducers } from 'redux';
import users from './users';
import vendors from './vendors';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  users,
  vendors
});
