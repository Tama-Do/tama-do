import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const GET_TREATS = 'GET_TREATS';
const REMOVE_TREAT = 'REMOVE_TREAT';

// /* ------------   ACTION CREATORS     ------------------ */

const getTreats = treats => ({ type: GET_TREATS, treats });
const removeTreat = treat => ({ type: REMOVE_TREAT, treat });

// /* ------------       REDUCER     ------------------ */

const reducer = (treats = [], action) => {
    switch (action.type) {
        case GET_TREATS:
            return action.treats;
        // case REMOVE_TREAT:
        //     treats.reduce((acc, treat) => {
        //       if (treat.type !== action.treat.type) {
        //         return acc.push(treat)
        //       } else {
        //         treat.type
        //       }
        //     }, []);
        default:
            return treats;
    }
}

export default reducer

// /* ------------       DISPATCHERS     ------------------ */

export const fetchTreats = (userId) => dispatch => {

    database.ref(`/users/${userId}/treats`).on('value', snapshot => {
        dispatch(getTreats(snapshot.val()));
    })

}
