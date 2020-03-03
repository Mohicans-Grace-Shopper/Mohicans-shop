import axios from 'axios';

const initialState = {
  products: [],
  product: {},
  loading: true,
  singleLoading: true
};

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_PRODUCT = 'SET_PRODUCT';
const UPDATED_QUANTITY = 'UPDATED_QUANTITY';

const setProducts = products => ({
  type: SET_PRODUCTS,
  products
});

const setProduct = product => ({
  type: SET_PRODUCT,
  product
});

const updatedQuantity = product => ({
  type: UPDATED_QUANTITY,
  product
});

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products');
      dispatch(setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`);
      dispatch(setProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const increaseQuantity = productId => async dispatch => {
  const {data} = await axios.put(`/api/products/${productId}/increase`);
  dispatch(updatedQuantity(data));
};

export const decreaseQuantity = productId => async dispatch => {
  const {data} = await axios.put(`/api/products/${productId}/decrease`);
  dispatch(updatedQuantity(data));
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products, loading: false};
    case SET_PRODUCT:
      return {...state, product: action.product, singleLoading: false};
    case UPDATED_QUANTITY:
      return {...state, product: action.product};
    default:
      return state;
  }
}
