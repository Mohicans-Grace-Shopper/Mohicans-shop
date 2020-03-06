import axios from 'axios';

const initState = {
  orderId: '',
  products: [],
  loading: true
};

const SET_CART = 'SET_CART';
const PURCHASE_CART = 'PURCHASE_CART';

const setCart = order => ({
  type: SET_CART,
  order
});

const purchaseCart = () => ({
  type: PURCHASE_CART
});

export const fetchCart = function() {
  return async function(dispatch) {
    const {data} = await axios.get('/api/users/cart');
    dispatch(setCart(data));
  };
};

export const addedToCart = function(productObj) {
  return async function(dispatch) {
    await axios.put(`/api/users/cart`, productObj);
    const {data} = await axios.get('/api/users/cart');
    dispatch(setCart(data));
  };
};

export const editProductQuant = function(productObj) {
  return async function(dispatch) {
    await axios.put(`/api/users/cart`, productObj);
    const {data} = await axios.get('/api/users/cart');
    dispatch(setCart(data));
  };
};

export const removedProduct = function(productObj) {
  return async function(dispatch) {
    await axios.delete(
      `/api/users/cart/${productObj.orderId}/${productObj.productId}`
    );
    const {data} = await axios.get('/api/users/cart');
    dispatch(setCart(data));
  };
};

export const completeOrder = function(orderId) {
  return async function(dispatch) {
    const {data} = await axios.put(`/api/users/cart/${orderId}`);
    console.log(data);
    if (data.isFulfilled) {
      dispatch(purchaseCart());
    }
  };
};

export default function(state = initState, action) {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        orderId: action.order.id,
        products: action.order.products,
        loading: false
      };
    case PURCHASE_CART:
      return {...initState, orderId: state.orderId + 1};
    default:
      return state;
  }
}
