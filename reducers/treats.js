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
        for (let key in obj) {
          array.push(obj[key]);
        }
        dispatch(getTreats(array));
    })

}
