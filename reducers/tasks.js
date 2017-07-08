import database from '../firebase';

// /* -----------------    ACTIONS     ------------------ */

const GET_TASKS = 'GET_TASKS';


// /* ------------   ACTION CREATORS     ------------------ */

export const getTasks = tasks => ({ type: GET_TASKS, tasks });


// /* ------------       REDUCER     ------------------ */

const reducer = (tasks = {}, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {all: action.tasks.tasks,
                completed:action.tasks.completed,
                uncompleted: action.tasks.uncompleted};
        default:
            return tasks;
    }
}

export default reducer

// /* ------------       DISPATCHERS     ------------------ */

export const fetchTasks = (userId) => dispatch => {
    database.ref(`/users/${userId}/tasks`).on('value', snapshot => {
        const obj = snapshot.val();
        const tasks = [];
        for(let key in obj) {
          obj[key].key = key
          tasks.push(obj[key]);
        }
        var completed = tasks.filter(task => task.completed)
        var uncompleted = tasks.filter(task => !task.completed)
        dispatch(getTasks({tasks, completed, uncompleted}));
    });

}



