import {auth} from '../firebase';
import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const LOGIN_USER_START = 'LOGIN_USER_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
const SET_USER = 'SET_USER'


// /* ------------   ACTION CREATORS     ------------------ */

const loginSuccess = user => ({type: LOGIN_SUCCESS, user});

export const setUser = user => ({type: SET_USER, user})

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
    case SET_USER:
      return Object.assign({}, state, action.user)
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
// let monsters = {0: {name:"",type:"grayMonster",size:1,location:""},1:{name:"",type:"grayMonster",size:1,location:""}}

export const createUser = (email, uid, dispatch) => {
  //let monsters = {name:"",type:"grayMonster",size:1,location:""}
  let monsters = {0: {name:"I need name",type:"grayMonster",size:1,location:""},1:{name:"name me",type:"grayMonster",size:1,location:""},2:{name:"no name yet",type:"grayMonster",size:1,location:""}}

  database.ref('users/' + uid).set({
    email: email,
    pets: monsters
  })
  // let petsRef = database.ref(`users/${uid}`).child('pets')
  // let newPetsRef = petsRef.push();
  // newPetsRef.set(monsters)
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
