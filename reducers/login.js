import {auth} from '../firebase';
import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const LOGIN_USER_START = 'LOGIN_USER_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';


// /* ------------   ACTION CREATORS     ------------------ */

const loginSuccess = user => ({type: LOGIN_SUCCESS, user});
//const loginFail = user => ({type: LOGIN_USER_FAIL, user});


// /* ------------       REDUCER     ------------------ */

const initalState = {
  email: '',
  loading: false,
  user: null,
  error: ''
 };

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return Object.assign({}, state, action.user);
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Login failed.', password: '', loading: false };
    default:
      return state;
  }
};

export default reducer

// /* ------------       DISPATCHERS     ------------------ */

export const loginUser = ( email, password ) => {

  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    // should the following eventually be refactored so that instead of automatically
    // creating user it redirects to a signup page where users can create an username?
      auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        createUser(data.email, data.uid, dispatch)
      })
      .catch(error => console.log(error))
        //dispatch login user fail at some point
    };
};

export const signInUser = ( email, password ) => {

  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    // should the following eventually be refactored so that instead of automatically
    // creating user it redirects to a signup page where users can create an username?
    auth.signInWithEmailAndPassword(email, password)
      .then(data => {
        dispatch(loginSuccess({email: data.email, uid: data.uid}))
      })
      .catch(error => console.log(error))
          //dispatch login user fail at some point
    };
};

export const createUser = (email, uid, dispatch) => {
  database.ref('users/' + uid).set({
    //username: name,
    email: email
    //profile_picture : imageUrl
  })
  .then(() => {
    dispatch(loginSuccess({email, uid}))
  })
  .catch(error => console.log("error is", error))
}


// const loginFail = (dispatch, user) => {
//   dispatch({
//     type: LOGIN_USER_FAIL,
//     payload: user
//   });
// };
