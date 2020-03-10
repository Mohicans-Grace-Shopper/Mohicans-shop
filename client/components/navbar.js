import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import Button from '@material-ui/core/Button';

const Navbar = ({handleClick, isLoggedIn, userId}) => (
  <div className="navDiv">
    <nav>
      <header>
        {isLoggedIn ? (
          <div className="navBarItems">
            {/* The navbar will show these links after you log in */}
            <div className="navButt">
              <Button color="inherit">
                <Link className="navlink" to="/home">
                  Home
                </Link>
              </Button>
            </div>
            <div className="navButt">
              <Button color="inherit">
                <Link className="navlink" to="/products">
                  Products
                </Link>
              </Button>
            </div>
            <div className="navButt" id="headerimg">
              <img src="/header.png" />
            </div>
            <div className="navButt">
              <Button color="inherit">
                <a className="navlink" href="#" onClick={handleClick}>
                  Logout
                </a>
              </Button>
            </div>
            <div className="navButt">
              <Button color="inherit">
                <Link className="navlink" to="/users/cart">
                  Cart
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="navBarItems">
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
            <div className="navButt" id="headerimg">
              <img src="/header.png" />
            </div>
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
      </header>
    </nav>
    {/* <hr /> */}
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: state.user.isAdmin
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
