import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import {fetchProduct, decreaseQuantity} from '../store/products';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    // this.decrease = this.decrease.bind(this);
  }

  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }

  //   decrease() {
  //     this.props.decreaseQuantity(this.props.match.params.productId);
  //   }

  render() {
    const product = this.props.product;
    // const disabledDecrease = product.quantity === 0;
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
          // disabled={disabledDecrease}
          // onClick={this.decrease}
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
  fetchProduct: productId => dispatch(fetchProduct(productId))
  // decreaseQuantity: productId => dispatch(decreaseQuantity(productId))
});

export default connect(mapState, mapDispatch)(SingleProduct);
