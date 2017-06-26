import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const EMAIL_CHANGED = 'EMAIL_CHANGED';
const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
const LOGIN_USER_START = 'LOGIN_USER_START';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';


// /* ------------   ACTION CREATORS     ------------------ */

export const emailChanged = text => ({type: EMAIL_CHANGED, text});
export const passwordChanged = text => ({type: PASSWORD_CHANGED, text});
// const loginSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
// const loginFail = user => ({type: LOGIN_USER_FAIL, user});


// /* ------------       REDUCER     ------------------ */

const initalState = {
  email: '',
  password: '',
  loading: false,
  user: null,
  error: ''
 };

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_START:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...initalState, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Login failed.', password: '', loading: false };
    default:
      return state;
  }
};

export default reducer

// /* ------------       DISPATCHERS     ------------------ */

export const loginUser = ({ email, password }) => {
  // redux-thunk gives access to dispatch & allows waiting for promise returns
  // dispatch of the action is not invoked until promise returns
  // loading spinner page while loading somehow?
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });

    database.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((authError) => {
        console.log(
          `firebase.auth().signInWithEmailAndPassword ${authError}`);
        database.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch((createError) => {
            console.log(
              `firebase.auth().createUserWithEmailAndPassword ${createError}`);
              loginUserFail(dispatch, user);
          });
      });
    };
};

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
