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
    const userId = this.props.match.params.userId;
    if (userId) {
      this.props.fetchCart(userId);
    } else {
      console.log('using local storage', window.localStorage);
      let cartContents = JSON.parse(
        window.localStorage.getItem('cartContents')
      );
      this.setState({cart: cartContents});
    }
  }

  editProduct(productId, action) {
    const userId = this.props.match.params.userId;
    let productObj = {
      orderId: this.props.orderId,
      productId: productId,
      action: action,
      quantity: 1
    };
    this.props.editProductQuant(userId, productObj);
  }

  deleteProduct(productId) {
    const userId = this.props.match.params.userId;
    console.log(this.props);
    let productObj = {
      orderId: this.props.orderId,
      productId: productId
    };
    this.props.removedProduct(userId, productObj);
  }

  render() {
    const {isLoggedIn} = this.props;
    const userId = this.props.match.params.userId;
    let cartItems;
    isLoggedIn ? (cartItems = this.props.items) : (cartItems = this.state.cart);
    /*if (!isLoggedIn) {
      return 'No Items in Cart';
    } else*/ if (
      isLoggedIn &&
      this.props.loading
    ) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    } else if (!cartItems || cartItems.length === 0) {
      return 'No Items in Cart';
    }
    console.log('cartitems', cartItems);
    let cartTotal = cartItems.reduce(
      (accum, item) =>
        accum + item.price * (isLoggedIn ? item.cart.quantity : item.quantity),
      0
    );
    return (
      <div>
        {cartItems.map(item => {
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`} />
              <img src={item.imageUrl} height="200" width="320" />
              <div>{item.name}</div>
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
        <p>Total: ${cartTotal}</p>
        <Link to={`/users/${userId}/cart/orderconfirmation`}>
          Proceed to Checkout
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderId: state.cart.orderId,
  items: state.cart.products,
  loading: state.cart.loading,
  isLoggedIn: !!state.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId)),
  editProductQuant: (userId, productObj) =>
    dispatch(editProductQuant(userId, productObj)),
  removedProduct: (userId, productObj) =>
    dispatch(removedProduct(userId, productObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
