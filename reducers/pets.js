

// /* -----------------    ACTIONS     ------------------ */

// const ALL_USERS = 'ALL_USERS'
// const GET_USER = 'GET_USER'
// const UPDATE = 'UPDATE_USER'
// const REMOVE_USER = 'REMOVE_USER'

// /* ------------   ACTION CREATORS     ------------------ */

// const allUsers = users => ({ type: ALL_USERS, users })
// const getUser = user => ({ type: GET_USER, user })
// const update = user => ({ type: UPDATE, user })
// const remove = id => ({ type: REMOVE_USER, id })

// /* ------------       REDUCER     ------------------ */

const reducer = (pets = ['harry'], action) => {
    return pets;
}

export default reducer

// /* ------------       DISPATCHERS     ------------------ */

// export const fetchAllUsers = () => dispatch => {
//   axios.get('/api/users')
//     .then(res => dispatch(allUsers(res.data)))
//     .catch(err => console.error(`Fetch all users: unsuccesful`, err))
// }

// export const fetchUser = uid => dispatch => {
//   axios.get(`/api/users/${uid}`)
//     .then(res => dispatch(getUser(res.data)))
//     .catch(err => console.error(`Fetch user: unsuccesful`, err))
// }

// export const updateUser = (uid, user) => dispatch => {
//   axios.put(`/api/users/${uid}`, user)
//     .then(res => dispatch(update(res.data)))
//     .catch(err => console.error(`Updating user: ${user} unsuccesful`, err))
// }

// export const removeUser = (uid) => dispatch => {
//   axios.delete(`/api/users/${uid}`)
//     .then(() => dispatch(remove(uid)))
//     .catch(err => console.error(`Removing user: ${uid} unsuccesful`, err))
// }
