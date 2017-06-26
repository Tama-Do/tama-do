import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  pets: require('./pets').default

});

export default rootReducer;
