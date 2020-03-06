import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchAllUsers} from '../store/users';

class Users extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchAllUsers();
  }
  render() {
    const users = this.props.users;
    return (
      <div>
        <h3>Active Users:</h3>
        {users.map(user => (
          <div key={user.id}>
            <Link to={`/users/${user.id}`}>{user.email}</Link>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  users: state.users.users
});

const mapDispatch = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers())
});

export default connect(mapState, mapDispatch)(Users);
