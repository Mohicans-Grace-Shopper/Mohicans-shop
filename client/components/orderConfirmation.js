import React from 'react';
import {connect} from 'react-redux';
import {fetchCart, completeOrder} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
    this.checkout = this.checkout.bind(this);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchCart();
    } else {
      let cartContents = JSON.parse(
        window.localStorage.getItem('cartContents')
      );
      // this.setState({cart: cartContents});
      this.setState({cart: Object.values(cartContents)});
    }
  }

  checkout() {
    let path = '/users/cart/thankyou';
    this.props.history.push(path);
    this.props.completeOrder(this.props.userId, this.props.orderId);
  }

  render() {
    const {isLoggedIn} = this.props;
    let cartItems;
    isLoggedIn ? (cartItems = this.props.items) : (cartItems = this.state.cart);
    let cartTotal = cartItems.reduce(
      (accum, item) =>
        accum + item.price * (isLoggedIn ? item.cart.quantity : item.quantity),
      0
    );
    if (isLoggedIn && this.props.loading) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    } else if (!cartItems || cartItems.length === 0) {
      return 'No Items in Cart';
    }
    return (
      <div>
        <h3>Order ID: {this.props.orderId} </h3>
        {cartItems.map(item => {
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`} />
              <img src={item.imageUrl} height="200" width="320" />
              <div>{item.name}</div>
              <div>
                Price: $
                {item.price * (isLoggedIn ? item.cart.quantity : item.quantity)}
              </div>
            </div>
          );
        })}
        <p>Total: ${cartTotal}</p>
        <button type="submit" onClick={() => this.checkout()}>
          Place Order
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderId: state.cart.orderId,
  items: state.cart.products,
  loading: state.cart.loading,
  userId: state.user.id,
  isLoggedIn: !!state.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  completeOrder: orderId => dispatch(completeOrder(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
