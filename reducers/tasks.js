import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const GET_TASKS = 'GET_TASKS';


// /* ------------   ACTION CREATORS     ------------------ */

const getTasks = tasks => ({ type: GET_TASKS, tasks });


// /* ------------       REDUCER     ------------------ */

const reducer = (tasks = [], action) => {
    switch (action.type) {
        case GET_TASKS:
            return action.tasks;
        default:
            return tasks;
    }
}

export default reducer

// /* ------------       DISPATCHERS     ------------------ */

export const fetchTasks = (userId) => dispatch => {

    // get all the user's task Ids
    // fetch the tasks by id. 
    let userId = 1 //need to do something other than hard code this in the future.
    var path = `/users/${userId}/tasks`
    database.ref(path).once('value') 
    .then(data => {
        dispatch(getTasks(data.val()))
    })

    // database.ref('/pets/userId0').once('value') // Are we interested in using on here????
    // .then(data => {
    //     console.log('******', data.val())
    //     dispatch(getPets(data.val()));
    // })
    // .catch(err => console.error(`Fetch all pets: unsuccessful`, err));

}
