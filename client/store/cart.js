import axios from 'axios';
import {createDispatchHook} from 'react-redux';

const initState = [];

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
    const {data} = await axios.get(`api/${userId}/cart`);
    dispatch(setCart(data));
  };
};

export const addedToCart = function(userId, product) {
  return async function(dispatch) {
    const {data} = await axios.get(`api/${userId}/cart`);
    let cartContents = data;
    if (cartContents.filter(pdt => pdt.id === product.id)) {
      cartContents = cartContents.map(item => {
        if (item.id === product.id) item.quantity += 1;
        return item;
      });
    } else {
      cartContents.push(product);
    }
    const addedProduct = await axios.post(`api/${userId}/cart/${product.id}`);
    dispatch(addToCart(addedProduct));
  };
};

export const increasedProduct = function(userId, product) {
  return async function(dispatch) {
    const {data} = await axios.post(`api/${userId}/cart/${product.id}`);
    dispatch(increaseInCart(data));
  };
};

export const reducedProduct = function(userId, product) {
  return async function(dispatch) {
    const {data} = await axios.delete(`/${userId}/cart/${product.id}`);
    dispatch(reduceProduct(data));
  };
};

export default function(state = initState, action) {
  switch (action.type) {
    case SET_CART:
      return action.products;
    case ADD_PRODUCT:
      state = state.filter(product => product.id !== action.product.id);
      return [...state, action.product];
    case INCREASE_PRODUCT:
      state = state.filter(product => product.id !== action.product.id);
      return [...state, action.product];

    default:
      return state;
  }
}
