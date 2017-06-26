import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  pets: require('./pets').default,
  tasks: require('./tasks').default

});

export default rootReducer;
