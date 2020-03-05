import axios from 'axios';

const initState = {
  orderId: '',
  products: [],
  loading: true
};

const SET_CART = 'SET_CART';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const setCart = order => ({
  type: SET_CART,
  order
});

const removeProduct = item => ({
  type: REMOVE_PRODUCT,
  item
});

export const fetchCart = function(userId) {
  return async function(dispatch) {
    const {data} = await axios.get(`/api/users/${userId}/cart`);
    dispatch(setCart(data));
  };
};

export const addedToCart = function(userId, productObj) {
  return async function(dispatch) {
    await axios.put(`/api/users/${userId}/cart`, productObj);
    const {data} = await axios.get(`/api/users/${userId}/cart`);
    dispatch(setCart(data));
  };
};

export const increasedProduct = function(userId, productObj) {
  return async function(dispatch) {
    await axios.put(`/api/users/${userId}/cart`, productObj);
    const {data} = await axios.get(`/api/users/${userId}/cart`);
    dispatch(setCart(data));
  };
};

export const reducedProduct = function(userId, productObj) {
  return async function(dispatch) {
    await axios.put(`/api/users/${userId}/cart/`, productObj);
    const {data} = await axios.get(`/api/users/${userId}/cart`);
    dispatch(setCart(data));
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
    // case ADD_PRODUCT:
    //   // eslint-disable-next-line no-case-declarations
    //   let prods = state.products.filter(
    //     product => product.id !== action.product.id
    //   );
    //   return { ...state, products: [...prods, action.product], loading: false };
    // case REDUCE_PRODUCT:
    //   let withoutpdt = state.products.filter(product => product.id !== action.product.id);
    //   return { ...state, products: withoutpdt, loading: false };
    default:
      return state;
  }
}
