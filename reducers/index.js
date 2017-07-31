import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  pets: require('./pets').petsReducer,
  selectedPet: require('./pets').petReducer,
  auth: require('./login').default,
  tasks: require('./tasks').default,
  treats: require('./treats').default
});

export default rootReducer;
