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
    //this will change when we integrate sign in and have
    // userid on state via the auth object
    database.ref(`/users/1/pets`).on('value', snapshot => {
        const obj = snapshot.val();
        const array = [];
        for(let key in obj) {
          array.push(obj[key]);
        }
        console.log("pets are ", array)
        dispatch(getPets(array));
    });

}