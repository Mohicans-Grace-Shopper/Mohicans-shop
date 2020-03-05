import React from 'react';
import {connect} from 'react-redux';
import {fetchCart, increasedProduct, reducedProduct} from '../store/cart';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  componentDidMount() {
    const userId = this.props.match.params.userId;
    if (userId) {
      this.props.fetchCart(userId);
    } else {
      console.log('using local storage');
      let cartContents = JSON.parse(
        window.localStorage.getItem('cartContents')
      );
    }
  }

  increase(productId) {
    const userId = this.props.match.params.userId;
    let productObj = {
      orderId: this.props.orderId,
      productId: productId,
      action: 'add',
      quantity: 1
    };
    this.props.increasedProduct(userId, productObj);
  }

  decrease(productId) {
    const userId = this.props.match.params.userId;
    let productObj = {
      orderId: this.props.orderId,
      productId: productId,
      action: 'subtract'
    };
    this.props.reducedProduct(userId, productObj);
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
              <Link to={`/products/${item.id}`} />
              <img src={item.imageUrl} height="200" width="320" />
              <div>{item.name}</div>
              <button type="submit" onClick={() => this.increase(item.id)}>
                Increase
              </button>
              <div>Quantity: {item.cart.quantity}</div>
              {item.cart.quantity > 1 ? (
                <button type="submit" onClick={() => this.decrease(item.id)}>
                  Decrease
                </button>
              ) : (
                <span />
              )}

              <div>Price: ${item.price * item.cart.quantity}</div>
              <button type="button">X</button>
            </div>
          );
        })}
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
  increasedProduct: (userId, productObj) =>
    dispatch(increasedProduct(userId, productObj)),
  reducedProduct: (userId, productObj) =>
    dispatch(reducedProduct(userId, productObj))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
