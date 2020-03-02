import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from "react-loader-spinner";
import { fetchProduct } from '../store/products'

class SingleProduct extends React.Component {
    componentDidMount() {
        if (this.props.fetchProduct) {
            this.props.fetchProduct();
        }
    }
    render() {
        const product = this.props.product;
        if (this.props.loading)
            return <Loader type="Hearts" color="blue" height={600} width={600} />;
        return (
            <div>
                <h3>{product.title} </h3>
                <div>
                    {product.imageUrl}
                </div>
                <div>
                    <p>Price: {product.price} </p>
                    <p>Quantity: {product.quantity} </p>
                    <p>Description: {product.description} </p>
                </div>
                <Link to="/products">Back to Products</Link>
            </div >

        )
    }
}


const mapState = state => ({
    product: state.products.product,
    loading: state.products.singleLoading
})

const mapDispatch = dispatch => ({
    fetchProduct: productId => dispatch(fetchProduct(productId)),
})

export default connect(mapState, mapDispatch)(SingleProduct)