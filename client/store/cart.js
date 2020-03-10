import axios from 'axios';

const initState = {
  orderId: '',
  products: [],
  loading: true,
  history: [],
  historyLoading: true
};

export const SET_CART = 'SET_CART';
export const PURCHASE_CART = 'PURCHASE_CART';
export const EDIT_CART = 'EDIT_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const SET_HISTORY = 'SET_HISTORY';

export const setCart = order => ({
  type: SET_CART,
  order
});

export const purchaseCart = () => ({
  type: PURCHASE_CART
});

export const editCart = productData => ({
  type: EDIT_CART,
  productData
});

export const removeFromCart = productToRemoveId => ({
  type: REMOVE_FROM_CART,
  productToRemoveId
});

const setHistory = orders => ({
  type: SET_HISTORY,
  orders
});

export const fetchCart = function(userId) {
  return async function(dispatch) {
    const {data} = await axios.get(`/api/users/${userId}/cart`);
    dispatch(setCart(data));
  };
};

// export const addedToCart = function(userId, productObj) {
//   return async function(dispatch) {
//     await axios.put(`/api/users/${userId}/cart`, productObj);
//     const {data} = await axios.get(`/api/users/${userId}/cart`);
//     dispatch(setCart(data));
//   };
// };

export const editTheCart = function(userId, productObj) {
  return async function(dispatch) {
    const {data} = await axios.put(`/api/users/${userId}/cart`, productObj);
    dispatch(editCart(data));
  };
};

export const removedProduct = function(userId, productObj) {
  return async function(dispatch) {
    await axios.delete(
      `/api/users/cart/${productObj.orderId}/${productObj.productId}`
    );
    dispatch(removeFromCart(productObj.productId));
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

export const fetchHistory = function(userId) {
  return async function(dispatch) {
    const {data} = await axios.get(`/api/users/${userId}/cart/orderhistory`);
    dispatch(setHistory(data));
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
    case EDIT_CART: {
      let idx = state.products.findIndex(
        product => product.id === action.productData.id
      );
      if (idx > -1) {
        let updatedProducts = [...state.products];
        updatedProducts[idx].cart.quantity = action.productData.quantity;
        return {
          ...state,
          products: updatedProducts
        };
      } else {
        return state;
      }
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productToRemoveId
        )
      };
    case SET_HISTORY:
      return {...state, history: action.orders, historyLoading: false};
    default:
      return state;
  }
}
