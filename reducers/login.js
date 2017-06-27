import {auth} from '../firebase';
import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const LOGIN_USER_START = 'LOGIN_USER_START';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';


// /* ------------   ACTION CREATORS     ------------------ */

const loginSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
// const loginFail = user => ({type: LOGIN_USER_FAIL, user});


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
    case LOGIN_USER_SUCCESS:
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

    auth.signInWithEmailAndPassword(email, password) //this should eventually be refactored so that instead of automatically creating user
      .then(user => {                                 // it redirects to a signup page where users can create an username 
        loginUserSuccess(dispatch, user)})
      .catch((authError) => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(data => {
          createUser(data.email, data.uid)
          dispatch(loginSuccess({email:data.email, uid: data.uid}))
        })
        .catch(error => console.log(error))
          //dispatch login user fail at some point
      });
    };
};

const createUser = (email, uid) => {
  database.ref('users/' + uid).set({ 
    //username: name,
    email: email
    //profile_picture : imageUrl
  })
  .then(data => console.log("data is", data)) //here we've succeeded and can dispatch success, maybe with email or uid??? data is nothing
  .catch(error => console.log("error is", error))
}


const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

};

const loginUserFail = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: user
  });
};


