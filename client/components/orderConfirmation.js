import React from 'react';
import {connect} from 'react-redux';
import {fetchCart} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

class OrderConfirmation extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId;
    if (userId) {
      this.props.fetchCart(userId);
    }
  }

  render() {
    if (this.props.loading) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    }
    let cartTotal = this.props.items.reduce(
      (accum, item) => accum + item.price * item.cart.quantity,
      0
    );
    return (
      <div>
        <h3>Order ID: {this.props.orderId} </h3>
        {this.props.items.map(item => {
          return (
            <div key={item.id}>
              <Link to={`/products/${item.id}`} />
              <img src={item.imageUrl} height="200" width="320" />
              <div>{item.name}</div>
              <div>Price: ${item.price * item.cart.quantity}</div>
            </div>
          );
        })}
        <p>Total: {cartTotal}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orderId: state.cart.orderId,
  items: state.cart.products,
  loading: state.cart.loading
});

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(fetchCart(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation);
