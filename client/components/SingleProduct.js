import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {fetchProduct} from '../store/products';
import {addedToCart} from '../store/cart';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }

  increase() {
    this.setState({quantity: this.state.quantity + 1});
    // this.props.increaseQuantity(this.props.match.params.productId);
  }

  decrease() {
    this.setState({quantity: this.state.quantity - 1});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const userId = this.props.match.params.userId;
    const productId = this.props.match.params.productId;
    if (!userId) {
      let localCart = JSON.parse(window.localStorage.getItem('cartContents'));
      localCart.push({...this.props.product, quantity: this.state.quantity});
      window.localStorage.setItem('cartContents', JSON.stringify(localCart));
    } else {
      this.props.addedToCart(userId, productId);
    }
    this.setState({quantity: 0});
  }

  render() {
    const product = this.props.product;
    const disabledDecrease = this.state.quantity === 0;
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        <h3>{product.title} </h3>
        <div>
          <img src={product.imageUrl} />
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
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }
}

const mapState = state => ({
  product: state.products.product,
  loading: state.products.singleLoading
});

const mapDispatch = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  addedToCart: (userId, product) => dispatch(addedToCart(userId, product)),
  decreaseQuantity: productId => dispatch(decreaseQuantity(productId)),
  increaseQuantity: productId => dispatch(increaseQuantity(productId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
