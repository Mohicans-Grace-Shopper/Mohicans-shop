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
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
            <div>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
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
  loading: state.products.loading
});

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
});

export default connect(mapState, mapDispatch)(Products);
