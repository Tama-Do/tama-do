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

export const fetchPets = () => dispatch => {

    database.ref('/pets/0').once('value')
    .then(data => {
        dispatch(getPets(data.val()));
    })
    .catch(err => console.error(`Fetch all pets: unsuccessful`, err));

}
