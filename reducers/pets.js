import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const GET_PETS = 'GET_PETS';


// /* ------------   ACTION CREATORS     ------------------ */

const getPets = pets => ({ type: GET_PETS, pets });


// /* ------------       REDUCER     ------------------ */

const reducer = (pets = [], action) => {
    switch (action.type) {
        case GET_PETS:
            return action.pets;
        default:
            return pets;
    }
}

export default reducer

// /* ------------       DISPATCHERS     ------------------ */

export const fetchPets = (userId) => dispatch => {
    database.ref(`/users/${userId}/pets`).on('value', snapshot => {
        const obj = snapshot.val();
        const array = [];
        for(let key in obj) {
          obj[key].key = key
          array.push(obj[key]);
        }
        console.log("pets are ", array)
        dispatch(getPets(array));
    });

}