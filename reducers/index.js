import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  pets: require('./pets').default,
  auth: require('./login').default,
  tasks: require('./tasks').default
});

export default rootReducer;
