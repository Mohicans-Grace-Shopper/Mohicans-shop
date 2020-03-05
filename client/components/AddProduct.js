import React, {Component} from 'react';
import ProductForm from './admin-product-form';
import {connect} from 'react-redux';
import {addProductThunk} from '../store/adminstore';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addProductThunk(this.state);
    this.setState({...this.state});
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  render() {
    return (
      <div>
        <ProductForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products.products
});

const mapDispatch = dispatch => ({
  addProductThunk: params => dispatch(addProductThunk(params))
});

export default connect(mapState, mapDispatch)(AddProduct);
