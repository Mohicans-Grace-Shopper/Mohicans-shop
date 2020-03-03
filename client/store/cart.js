import axios from 'axios';

const initState = {
  products: [],
  loading: true
};

const SET_CART = 'SET_CART';
const ADD_PRODUCT = 'ADD_PRODUCT';
const INCREASE_PRODUCT = 'INCREASE_PRODUCT';
const REDUCE_PRODUCT = 'REDUCE_PRODUCT';
const EMPTY_CART = 'EMPTY_CART';

const setCart = products => ({
  type: SET_CART,
  products
});

const addToCart = product => ({
  type: ADD_PRODUCT,
  product
});

const increaseInCart = product => ({
  type: INCREASE_PRODUCT,
  product
});

const reduceProduct = product => ({
  type: REDUCE_PRODUCT,
  product
});

export const fetchCart = function(userId) {
  return async function(dispatch) {
    const {data} = await axios.get(`/api/users/${userId}/cart`);
    console.log(data.products);
    dispatch(setCart(data.products));
  };
};

export const addedToCart = function(userId, productId) {
  return async function(dispatch) {
    const addedProduct = await axios.post(
      `api/users/${userId}/cart/${productId}`
    );
    console.log(addedProduct);
    dispatch(addToCart(addedProduct));
  };
};

export const increasedProduct = function(userId, product) {
  return async function(dispatch) {
    const {data} = await axios.post(`api/users/${userId}/cart/${product.id}`);
    dispatch(increaseInCart(data));
  };
};

export const reducedProduct = function(userId, product) {
  return async function(dispatch) {
    const {data} = await axios.delete(
      `/api/users/${userId}/cart/${product.id}`
    );
    dispatch(reduceProduct(data));
  };
};

export default function(state = initState, action) {
  switch (action.type) {
    case SET_CART:
      return {...state, products: action.products, loading: false};
    case ADD_PRODUCT:
      state = state.filter(product => product.id !== action.product.id);
      return {...state, products: action.product, loading: false};
    case INCREASE_PRODUCT:
      state = state.filter(product => product.id !== action.product.id);
      return {...state, products: action.product, loading: false};

    default:
      return state;
  }
}
