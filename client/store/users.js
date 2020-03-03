import axios from 'axios'

const initialState = { 
    users: []
}

const FETCH_USERS = 'FETCH_USERS'

const fetchUsers = users => ({ type: FETCH_USERS, users })

export const fetchAllUsers = () => { 
    return async dispatch => { 
      try {
        const { data } = await axios.get('/api/users')
        dispatch(fetchUsers(data))
      } catch (error) {
        console.error(error)
      }
    }
  }

  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_USERS:
        return { ...state, users: action.users }
      default:
        return state
    }
  }