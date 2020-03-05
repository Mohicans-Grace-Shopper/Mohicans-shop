import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {fetchProduct, deleteProductThunk} from '../store/products';
import {fetchCart, addedToCart} from '../store/cart';
import UpdateProduct from './UpdateProduct';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
    if (this.props.match.params.userId)
      this.props.fetchCart(this.props.match.params.userId);
  }

  increase() {
    this.setState({quantity: this.state.quantity + 1});
  }

  decrease() {
    this.setState({quantity: this.state.quantity - 1});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const userId = this.props.match.params.userId;
    let productObj = {
      orderId: this.props.orderId,
      productId: this.props.product.id,
      action: 'add',
      quantity: this.state.quantity
    };
    if (!userId) {
      let localCart = JSON.parse(window.localStorage.getItem('cartContents'));
      const productIndex = localCart.findIndex(
        product => product.id === this.props.product.id
      );
      if (productIndex === -1) {
        localCart.push({...this.props.product, quantity: this.state.quantity});
      } else {
        localCart[productIndex].quantity += this.state.quantity;
      }
      window.localStorage.setItem('cartContents', JSON.stringify(localCart));
    } else {
      this.props.addedToCart(userId, productObj);
    }
    this.setState({quantity: 1});
  }

  deleteProduct(evt) {
    evt.preventDefault();
    const userId = this.props.match.params.userId;
    this.props.deleteProductThunk(this.props.product.id);
    this.props.history.push(`/${userId}/products`);
  }

  render() {
    const product = this.props.product;
    const disabledDecrease = this.state.quantity === 1;
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        <h3>{product.title} </h3>
        <div>
          <img src={product.imageUrl} height="300" width="420" />
        </div>
        <div>
          <p>Price: {product.price} </p>
          <p>Quantity: {product.quantity} </p>
          <p>Description: {product.description} </p>
        </div>
        <div>
          <button type="button" onClick={this.increase}>
            Increase
          </button>
          <div>{this.state.quantity}</div>
          <button
            type="button"
            disabled={disabledDecrease}
            onClick={this.decrease}
          >
            Decrease
          </button>
        </div>
        <button type="submit" onClick={this.handleSubmit}>
          Add to Cart
        </button>
        <div>
          {this.props.isAdmin ? (
            <div>
              <h3>Update Product: </h3> <UpdateProduct />
            </div>
          ) : (
            <div />
          )}
        </div>
        <div>
          {this.props.isAdmin ? (
            <div>
              <h3>Delete Product? </h3>{' '}
              <button type="submit" onClick={this.deleteProduct}>
                Delete
              </button>
            </div>
          ) : (
            <div />
          )}
        </div>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }
}

const mapState = state => ({
  orderId: state.cart.orderId,
  product: state.products.product,
  loading: state.products.singleLoading,
  isAdmin: state.user.isAdmin
});

const mapDispatch = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  addedToCart: (userId, product) => dispatch(addedToCart(userId, product)),
  fetchCart: userId => dispatch(fetchCart(userId)),
  deleteProductThunk: productId => dispatch(deleteProductThunk(productId))

  // increaseQuantity: productId => dispatch(increaseQuantity(productId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
