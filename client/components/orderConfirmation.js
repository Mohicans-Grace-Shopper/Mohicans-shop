import React from 'react';
import {connect} from 'react-redux';
import {fetchCart, completeOrder} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';
import axios from 'axios';

class OrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      email: null
    };
    this.checkout = this.checkout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const userId = this.props.userId;
    if (userId) {
      this.props.fetchCart();
    } else {
      let localCart = JSON.parse(window.localStorage.getItem('cartContents'));
      this.setState({cartItems: Object.values(localCart)});
    }
  }

  async checkout() {
    if (!this.props.userId) {
      const res = await axios.post('/api/users/guest/cart', {
        orderItems: this.state.cartItems
      });
      await axios.put(`/api/users/cart/${res.data.id}`);
    }
    this.props.completeOrder(this.props.orderId);
    let path = '/users/cart/thankyou';
    this.props.history.push(path);
    window.localStorage.clear();
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({email: event.target.email.value});
    // const res = await axios.post('/api/users/guest/cart', {email: event.target.email.value, orderItems: this.state.cartItems});
  }

  render() {
    if (this.props.loading && this.props.userId) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    }

    let orderItems;

    this.props.userId
      ? (orderItems = this.props.items)
      : (orderItems = this.state.cartItems);

    let cartTotal = orderItems.reduce(
      (accum, item) => accum + item.price * item.quantity,
      0
    );

    return (
      <div>
        {this.props.orderId ? null : (
          <div>
            <h4>Guest Checkout</h4>
            {this.state.email ? (
              this.state.email
            ) : (
              <form name="guestcheckout" onSubmit={this.handleSubmit}>
                <label htmlFor="email">E-mail Address:</label>
                <input type="text" name="email" />
                <button type="submit">Continue</button>
              </form>
            )}
          </div>
        )}

        <div>
          <h3>Order Summary: </h3>
          {orderItems.map(item => {
            return (
              <div key={item.id}>
                <Link to={`/products/${item.id}`} />
                <img src={item.imageUrl} height="200" width="320" />
                <div>{item.name}</div>
                <div>Price: ${item.price * item.quantity}</div>
              </div>
            );
          })}
          <p>Total: ${cartTotal}</p>
          <button
            type="submit"
            disabled={!this.props.userId && !this.state.email}
            onClick={() => this.checkout()}
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderId: state.cart.orderId,
  items: state.cart.products,
  loading: state.cart.loading,
  quantity: state.cart.quantity,
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  completeOrder: orderId => dispatch(completeOrder(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
