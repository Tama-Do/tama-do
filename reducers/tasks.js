import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const GET_TASKS = 'GET_TASKS';


// /* ------------   ACTION CREATORS     ------------------ */

export const getTasks = tasks => ({ type: GET_TASKS, tasks });


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

    let userId = 1 //need to do something other than hard code this in the future.
    var path = `/users/${userId}/tasks`
    database.ref(path).on('value',  (data => {
        dispatch(getTasks(data.val()))
   
    }))

    

}
