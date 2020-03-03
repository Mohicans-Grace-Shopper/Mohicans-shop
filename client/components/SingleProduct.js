import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {fetchProduct} from '../store/products';
import {addedToCart} from '../store/cart';

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }

  //   decrease() {
  //     this.props.decreaseQuantity(this.props.match.params.productId);
  //   }
  handleSubmit(evt) {
    evt.preventDefault();
    const userId = this.props.match.params.userId;
    const productId = this.props.match.params.productId;
    this.props.addedToCart(userId, productId);
  }

  render() {
    const product = this.props.product;
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        <h3>{product.name} </h3>
        <div>
          <img src={product.imageUrl} />
        </div>
        <div>
          <p>Price: {product.price} </p>
          <p>Quantity: {product.quantity} </p>
          <p>Description: {product.description} </p>
        </div>
        <Link to="/addProduct" onSubmit={this.handleSubmit}>
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
  addedToCart: (userId, product) => dispatch(addedToCart(userId, product))
  // decreaseQuantity: productId => dispatch(decreaseQuantity(productId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
