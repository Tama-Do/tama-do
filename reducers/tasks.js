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
    database.ref(`/users/${userId}/tasks`).on('value', snapshot => {
        const obj = snapshot.val();
        const array = [];
        for(let key in obj) {
          array.push(obj[key]);
        }
        console.log("tasks are ", array)
        dispatch(getTasks(array));
    });

}
    


