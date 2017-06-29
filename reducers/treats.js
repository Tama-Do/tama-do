import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const GET_TREATS = 'GET_TREATS';

// /* ------------   ACTION CREATORS     ------------------ */

const getTreats = treats => ({ type: GET_TREATS, treats });

// /* ------------       REDUCER     ------------------ */

const reducer = (treats = [], action) => {
    switch (action.type) {
        case GET_TREATS:
            return action.treats;
        default:
            return treats;
    }
}

export default reducer;

// /* ------------       DISPATCHERS     ------------------ */

export const fetchTreats = (userId) => dispatch => {

    database.ref(`/users/${userId}/treats`).on('value', snapshot => {
        const obj = snapshot.val();
        const array = [];
        let newObj;
        for (let key in obj) {
          newObj = Object.assign({}, obj[key])
          newObj.id = key;
          array.push(newObj);
        }
        dispatch(getTreats(array));
    });

};

export const removeTreat = (userId, treatId) => dispatch => {

  database.ref(`/users/${userId}/treats/`).child(treatId).remove();

};
