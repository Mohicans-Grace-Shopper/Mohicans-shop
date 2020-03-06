import React, {Component} from 'react';
import ProductForm from './admin-product-form';
import {connect} from 'react-redux';
import {updateProductThunk} from '../store/products';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: this.props.product.name,
        price: this.props.product.price
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProductThunk(this.props.product.id, this.state);
    this.setState({...this.state});
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  render() {
    return (
      <div>
        <ProductForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = state => ({
  product: state.products.product
});

const mapDispatch = dispatch => ({
  updateProductThunk: (productId, params) =>
    dispatch(updateProductThunk(productId, params))
});

export default connect(mapState, mapDispatch)(UpdateProduct);
