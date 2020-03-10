import React from 'react';
import {connect} from 'react-redux';
import {} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class PurchaseHistory extends React.Component {
  async componentDidMount() {
    const userId = this.props.userId;
    // const res = await axios.get(`/api/users/${userId}/cart/orderhistory`);
    // console.log(res);
  }

  render() {
    if (this.props.loading && this.props.userId) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    }

    let orderItems;

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
  loading: state.cart.loading,
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  completeOrder: orderId => dispatch(completeOrder(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
