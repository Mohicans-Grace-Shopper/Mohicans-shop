import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSingleUser} from '../store/users';

class SingleUser extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.fetchSingleUser(userId);
  }

  render() {
    const user = this.props.user;
    return (
      <div>
        {this.props.user.isAdmin ||
        this.props.user.id === this.props.match.params.userId ? (
          <div>
            <h3>{user.email}</h3>
            <Link to="/users">Back to Users</Link>
          </div>
        ) : (
          <div>
            <h3>Page Not Found</h3>
            <Link to="/">Go Home</Link>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.users.user
});

const mapDispatch = dispatch => ({
  fetchSingleUser: userId => dispatch(fetchSingleUser(userId))
});

export default connect(mapState, mapDispatch)(SingleUser);
