import axios from 'axios'
import history from '../history'

const initialState = {
    products: [],
    product: {},
    loading: true
}

const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_PRODUCT = 'SET_PRODUCT'

const setProducts = products => ({
    type: SET_PRODUCTS,
    products
})

const setProduct = product => ({
    type: SET_PRODUCT,
    product
})

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get("/api/products");
            dispatch(setProducts(data));
        } catch (err) {
            console.log(err);
        }
    };
};

export const fetchProduct = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/products/${productId}`);
            dispatch(setProduct(data));
        } catch (err) {
            console.log(err);
        }
    };
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.products, loading: false };
        case SET_PRODUCT:
            return { ...state, product: action.product, loading: false };
        default:
            return state
    }
}

export default productsReducer