import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {fetchProduct, decreaseQuantity} from '../store/products';
import {addedToCart} from '../store/cart';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }

  //   decrease() {
  //     this.props.decreaseQuantity(this.props.match.params.productId);
  //   }
  handleSubmit(evt) {
    evt.preventDefault();
  }

  addToCart(product) {
    this.props.addedToCart(product);
  }

  render() {
    const product = this.props.product;
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
        <Link
          to="/addProduct"
          onSubmit={this.handleSubmit}
          onClick={this.addToCart(product)}
        >
          Add to Cart
        </Link>
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
  addedToCart: product => dispatch(addedToCart(product))
  // decreaseQuantity: productId => dispatch(decreaseQuantity(productId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
