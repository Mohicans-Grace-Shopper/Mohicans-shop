import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from "react-loader-spinner";
import { fetchProduct } from '../store/products'

class SingleProduct extends React.Component {
    componentDidMount() {
        const productId = this.props.match.params.productId
        this.props.fetchProduct(productId);

    }
    render() {
        const product = this.props.product;
        if (this.props.loading)
            return <Loader type="Hearts" color="blue" height={600} width={600} />;
        return (
            <div>
                <h3>{product.title} </h3>
                <div>
                    <img src={product.imageUrl}/>
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