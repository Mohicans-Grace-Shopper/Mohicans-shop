import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = ({handleClick, isLoggedIn, userId, isAdmin}) => (
  <div>
    <h1>Twilight Gems & Apothecary</h1>
    <nav>
      <AppBar position="static">
        <Toolbar>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Button color="inherit">
                <Link className="navlink" to="/home">
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <a className="navlink" href="#" onClick={handleClick}>
                  Logout
                </a>
              </Button>
              <Button color="inherit">
                <Link className="navlink" to={`/${userId}/products`}>
                  Products
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="navlink" to="/users/cart">
                  Cart
                </Link>
              </Button>
              {isAdmin ? (
                <Button color="inherit">
                  <Link className="navlink" to="/users">
                    Users
                  </Link>
                </Button>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Button color="inherit">
                <Link className="navlink" to="/login">
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="navlink" to="/signup">
                  Sign Up
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="navlink" to="/products">
                  Products
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="navlink" to="/cart">
                  Cart
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: !!state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      window.localStorage.clear();
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
