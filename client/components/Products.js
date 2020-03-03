import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {fetchProducts} from '../store/products';

class Products extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.props.products;
    const {userId} = this.props;
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
            <div>
              {this.props.isLoggedIn ? (
                <Link to={`/${userId}/products/${product.id}`}>
                  {product.name}
                </Link>
              ) : (
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              )}
              <img src={product.imageUrl} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products.products,
  loading: state.products.loading,
  isLoggedIn: !!state.user.id,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapState, mapDispatch)(Products);
