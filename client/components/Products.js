import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {fetchProducts} from '../store/products';
import {addedToCart} from '../store/cart';
import AddProduct from './AddProduct';

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
    if (!this.props.match.params.userId) {
      window.localStorage.setItem('cartContents', JSON.stringify([]));
    }
  }

  render() {
    const products = this.props.products;
    const {userId} = this.props;
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        <h2 className="section-title">Products</h2>
        <ul className="container">
          {products.map(product => (
            <div key={product.id} className="card">
              <div>
                {this.props.isLoggedIn ? (
                  <Link to={`/${userId}/products/${product.id}`}>
                    {product.name}
                  </Link>
                ) : (
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                )}
              </div>
              <img src={product.imageUrl} height="200" width="320" />
              {/* <button type="submit" onClick={this.handleClick}>
              Add Product
            </button> */}
            </div>
          ))}
        </ul>
        <div>{this.props.isAdmin ? <AddProduct /> : <div />}</div>
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
