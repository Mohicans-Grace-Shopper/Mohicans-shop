import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {fetchProducts} from '../store/products';
import {addedToCart} from '../store/cart';
import AddProduct from './AddProduct';

export class Products extends React.Component {
  componentDidMount() {
    if (this.props.fetchProducts) {
      this.props.fetchProducts();
    }
  }

  render() {
    const products = this.props.products;
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        <h2 className="section-title">Products</h2>
        <ul className="container">
          {products.map(product => (
            <div key={product.id} className="card">
              <div>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </div>
              <img src={product.imageUrl} height="200" width="320" />
            </div>
          ))}
        </ul>
        <div>
          {this.props.isAdmin ? (
            <h3>
              Add Product <AddProduct />
            </h3>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products.products,
  loading: state.products.loading,
  isLoggedIn: !!state.user.id,
  userId: state.user.id,
  isAdmin: state.user.isAdmin
});

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addedToCart: (userId, productId) => dispatch(addedToCart(userId, productId))
});

export default connect(mapState, mapDispatch)(Products);
