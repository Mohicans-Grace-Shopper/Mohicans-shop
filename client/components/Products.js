import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {fetchProducts} from '../store/products';
import axios from 'axios';

class Products extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  async handleClick() {
    // temp function to submit new Product
    const newProduct = await axios.post('/api/products', {
      name: 'potion',
      price: 500.0
    });
  }

  render() {
    const products = this.props.products;
    if (this.props.loading)
      return <Loader type="Hearts" color="blue" height={600} width={600} />;
    return (
      <div>
        {products.map(product => (
          <div className="products" key={product.id}>
            <div className="product">
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <img src={product.imageUrl} />
            </div>
          </div>
        ))}
        <button onClick={this.handleClick}>Add Product</button>
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
