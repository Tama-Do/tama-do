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

    database.ref('/pets/').once('value')
    .then(data => {
        // console.log("DATA.VAL()", data.val())
        dispatch(getPets(data.val()));
    })
    .catch(err => console.error(`Fetch all pets: unsuccessful`, err));

}
