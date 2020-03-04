import React from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId;
    if (!window.localStorage.getItem('cartContents')) {
      this.props.fetchCart(userId);
    } else {
      console.log('using local storage');
      let cartContents = JSON.parse(
        window.localStorage.getItem('cartContents')
      );
    }
  }

  render() {
    const {isLoggedIn} = this.props;
    if (!isLoggedIn) {
      return 'No Items in Cart';
    } else if (this.props.loading) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    } else if (!this.props.items || this.props.items.length === 0) {
      return 'No Items in Cart';
    }
    return (
      <div>
        {this.props.items.map(item => {
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.imageUrl} />
                <div>{item.name}</div>
                <div>{item.cart.quantity}</div>
                <button type="button">X</button>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.cart.products,
  loading: state.cart.loading,
  isLoggedIn: !!state.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
