import axios from 'axios';

const initialState = {
  users: [],
  user: {}
};

const FETCH_USERS = 'FETCH_USERS';
const FETCH_USER = 'FETCH_USER';

const fetchUsers = users => ({type: FETCH_USERS, users});
const fetchUser = user => ({type: FETCH_USER, user});

export const fetchAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users');
      dispatch(fetchUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleUser = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}`);
      dispatch(fetchUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {...state, users: action.users};
    case FETCH_USER:
      return {...state, user: action.user};
    default:
      return state;
  }
}
