import React from 'react';
import {connect} from 'react-redux';
import {fetchCart, editProductQuant, removedProduct} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
    this.editProduct = this.editProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchCart(this.props.userId);
    } else {
      console.log('using local storage', window.localStorage);
      let cartContents = JSON.parse(
        window.localStorage.getItem('cartContents')
      );
      // this.setState({cart: cartContents});
      this.setState({cart: Object.values(cartContents)});
    }
  }

  editProduct(productId, action) {
    const {isLoggedIn} = this.props;
    if (isLoggedIn) {
      let productObj = {
        orderId: this.props.orderId,
        productId: productId,
        action: action,
        quantity: 1
      };
      this.props.editProductQuant(this.props.userId, productObj);
    } else {
      let localCart = JSON.parse(window.localStorage.getItem('cartContents'));
      if (action === 'add') {
        localCart[productId].quantity += 1;
      }
      if (action === 'subtract' && localCart[productId].quantity > 1) {
        localCart[productId].quantity -= 1;
      }
      window.localStorage.setItem('cartContents', JSON.stringify(localCart));
      // this.setState({cart: localCart});
      this.setState({cart: Object.values(localCart)});
    }
  }

  deleteProduct(productId) {
    const userId = this.props.userId;
    if (userId) {
      let productObj = {
        orderId: this.props.orderId,
        productId: productId
      };
      this.props.removedProduct(this.props.userId, productObj);
    } else {
      let localCart = JSON.parse(window.localStorage.getItem('cartContents'));
      // localCart.splice(productId, 1);
      delete localCart[productId];
      window.localStorage.setItem('cartContents', JSON.stringify(localCart));
      // this.setState({cart: localCart});
      this.setState({cart: Object.values(localCart)});
    }
  }

  render() {
    const {isLoggedIn} = this.props;
    let cartItems;
    isLoggedIn ? (cartItems = this.props.items) : (cartItems = this.state.cart);
    if (isLoggedIn && this.props.loading) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    } else if (!cartItems || cartItems.length === 0) {
      return <div className="startOfPage">No Items in Cart</div>;
    }

    let cartTotal = cartItems.reduce(
      (accum, item) =>
        accum + item.price * (isLoggedIn ? item.cart.quantity : item.quantity),
      0
    );

    return (
      <div className="startOfPage">
        <h3>Shopping Cart</h3>

        {cartItems.map(item => {
          // let itemIdentifier;
          // isLoggedIn ? (itemIdentifier = item.id) : (itemIdentifier = idx);
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`}>
                <img src={item.imageUrl} height="200" width="320" />
                <div>{item.name}</div>
              </Link>
              <button
                type="submit"
                onClick={() => this.editProduct(item.id, 'add')}
              >
                Increase
              </button>
              <div>
                Quantity: {isLoggedIn ? item.cart.quantity : item.quantity}
              </div>
              {(isLoggedIn ? item.cart.quantity : item.quantity) > 1 ? (
                <button
                  type="submit"
                  onClick={() => this.editProduct(item.id, 'subtract')}
                >
                  Decrease
                </button>
              ) : (
                <span />
              )}

              <div>
                Price: $
                {item.price * (isLoggedIn ? item.cart.quantity : item.quantity)}
              </div>
              <button type="submit" onClick={() => this.deleteProduct(item.id)}>
                X
              </button>
            </div>
          );
        })}
        <div>Total: ${cartTotal}</div>
        <Link to="/users/cart/orderconfirmation">Proceed to Checkout</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderId: state.cart.orderId,
  items: state.cart.products,
  loading: state.cart.loading,
  isLoggedIn: !!state.user.id,
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId)),
  editProductQuant: (userId, productObj) =>
    dispatch(editProductQuant(userId, productObj)),
  removedProduct: (userId, productObj) =>
    dispatch(removedProduct(userId, productObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
