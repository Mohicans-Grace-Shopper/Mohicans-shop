import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {fetchProduct, deleteProductThunk} from '../store/products';
import {fetchCart, editTheCart} from '../store/cart';
import UpdateProduct from './UpdateProduct';

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      addButtonVisible: true
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    if (this.props.fetchProduct) {
      const productId = this.props.match.params.productId;
      this.props.fetchProduct(productId);
      // if (this.props.userId) this.props.fetchCart(this.props.userId);
    }
  }

  increase() {
    this.setState({quantity: this.state.quantity + 1});
  }

  decrease() {
    this.setState({quantity: this.state.quantity - 1});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const userId = this.props.userId;
    let productObj = {
      orderId: this.props.orderId,
      productId: this.props.product.id,
      action: 'add',
      quantity: this.state.quantity
    };
    if (!userId) {
      let localCart = JSON.parse(window.localStorage.getItem('cartContents'));
      // const productIndex = localCart.findIndex(
      //   product => product.id === this.props.product.id
      // );
      // if (productIndex === -1) {
      //   localCart.push({...this.props.product, quantity: this.state.quantity});
      // } else {
      //   localCart[productIndex].quantity += this.state.quantity;
      // }
      if (!localCart[this.props.product.id]) {
        localCart[this.props.product.id] = {
          ...this.props.product,
          quantity: this.state.quantity
        };
        console.log('localCart', this.props.product.id);
      } else {
        localCart[this.props.product.id].quantity += this.state.quantity;
      }
      window.localStorage.setItem('cartContents', JSON.stringify(localCart));
    } else {
      this.props.addedToCart(this.props.userId, productObj);
    }
    // this.setState({quantity: 1});
    this.setState({quantity: 1, addButtonVisible: false});

    setTimeout(() => this.setState({addButtonVisible: true}), 1200);
  }

  deleteProduct(evt) {
    evt.preventDefault();
    this.props.deleteProductThunk(this.props.product.id);
    this.props.history.push('/products');
  }

  render() {
    const product = this.props.product;
    const disabledDecrease = this.state.quantity === 1;
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        <h3>{product.name} </h3>
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

        <div>
          {this.state.addButtonVisible ? (
            <button type="submit" onClick={this.handleSubmit}>
              Add to Cart
            </button>
          ) : (
            <button type="button" disabled={true}>
              added!
            </button>
          )}
        </div>

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
  isAdmin: state.user.isAdmin,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  addedToCart: (userId, product) => dispatch(editTheCart(userId, product)),
  fetchCart: userId => dispatch(fetchCart(userId)),
  deleteProductThunk: productId => dispatch(deleteProductThunk(productId))

  // increaseQuantity: productId => dispatch(increaseQuantity(productId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
