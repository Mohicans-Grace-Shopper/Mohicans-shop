import React from 'react';
import {connect} from 'react-redux';
import {fetchHistory} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

class PurchaseHistory extends React.Component {
  componentDidMount() {
    const userId = this.props.userId;
    if (userId) {
      this.props.fetchHistory(userId);
    }
  }

  render() {
    if (this.props.historyLoading) {
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    }
    // let cartTotal = orderItems.reduce(
    //   (accum, item) => accum + item.price * item.quantity,
    //   0
    // );
    const orderlist = this.props.history;
    return (
      <div>
        {this.props.history ? (
          <div>
            <h2>Purchase History</h2>
            {orderlist.map(order => {
              return (
                <div key={order.id}>
                  <h3>Order ID: {order.id} </h3>
                  <h4>Item list:</h4>
                  <div>
                    {order.products.map(product => {
                      return (
                        <div key={product.id}>
                          <img
                            src={product.imageUrl}
                            height="200"
                            width="320"
                          />
                          <div>{product.name}</div>
                          <div>Quantity: {product.cart.quantity}</div>
                          <div>
                            Price: $
                            {product.cart.itemPrice * product.cart.quantity}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No previous purchases</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  history: state.cart.history,
  historyLoading: state.cart.historyLoading,
  userId: state.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchHistory: userId => dispatch(fetchHistory(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseHistory);
