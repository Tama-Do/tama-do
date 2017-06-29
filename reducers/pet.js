import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const CURRENT_PET = 'CURRENT_PET';


// /* ------------   ACTION CREATORS     ------------------ */

const currentPet = pet => ({ type: CURRENT_PET, pet });


// /* ------------       REDUCER     ------------------ */

const reducer = (pets = {}, action) => {
    switch (action.type) {
        case CURRENT_PET:
            return action.pet;
        default:
            return pet;
    }
}

export default reducer;

// /* ------------       DISPATCHERS     ------------------ */

export const getPet = (userId, petId) => dispatch => {

    database.ref(`/users/${userId}/pets/${petId}`).on('value', snapshot => {
        const pet = snapshot.val();
        dispatch(currentPet(pet));
    });

};

// export const increasePet = (userId, petId, points) => dispatch => {

//     database.ref().child(`/users/${userId}/pets/${petId}`)
//         .update({ size: points });

// };
