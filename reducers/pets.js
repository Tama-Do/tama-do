import database from '../firebase'

// /* -----------------    ACTIONS     ------------------ */

const GET_PETS = 'GET_PETS'
const SELECT_PET = 'SELECT_PET'


 /* ------------   ACTION CREATORS     ------------------ */

const getPets = pets => ({ type: GET_PETS, pets })
export const selectPet = pet => ({ type: SELECT_PET, pet })


/* ------------       REDUCERS     ------------------ */

export const petsReducer = (pets = [], action) => {
    switch (action.type) {
        case GET_PETS:
            return action.pets
        default:
            return pets
    }
}

export const petReducer = (pet = '', action) => {
    switch (action.type) {
        case SELECT_PET:
            return action.pet
        default:
            return pet
    }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchPets = (userId) => dispatch => {
    database.ref(`/users/${userId}/pets`).on('value', snapshot => {
        const obj = snapshot.val()
        const array = []
        for(let key in obj) {
          obj[key].key = key
          array.push(obj[key])
        }
        dispatch(getPets(array))
    })
}

export const increasePet = (userId, petId, points) => dispatch => {

    database.ref().child(`/users/${userId}/pets/${petId}`)
        .update({ size: points });

};

export const addPetDate = (userId, petId, dateMS, date) => dispatch => {
    database.ref(`/users/${userId}/pets/${petId}/dates`).child(`${dateMS}`).set(`${date}`);
};
