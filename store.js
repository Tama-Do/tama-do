import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import database from './firebase'
import {getTasks} from './reducers/tasks'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      createLogger({collapsed: true})
    )
  )
)

export default store;

// fetch Pet information immediately by importing fetchPet from reducers and
// dispatching directly from store
import { fetchPets } from './reducers/pets';
var userId = 1; // until we figure out userID / auth stuff, test with static value
store.dispatch(fetchPets(1));


// doing it this way allows us to listen for changes
database.ref('/users/1/tasks').on('value', (snapshot) => {
      store.dispatch(getTasks(snapshot.val()))
    })

import { fetchTreats } from './reducers/treats'
store.dispatch(fetchTreats(1));
