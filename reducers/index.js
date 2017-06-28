import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  pets: require('./pets').default,
  tasks: require('./tasks').default,
  treats: require('./treats').default,
  auth: require('./login').default,
});

export default rootReducer;
