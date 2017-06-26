import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

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

// fetch Pet information immediately
import { fetchPets } from './reducers/pets';

import { fetchTasks } from './reducers/tasks'

store.dispatch(fetchPets());
store.dispatch(fetchTasks())
