import axios from 'axios';

const initialState = {
  products: [],
  product: {}
};

const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
});

const updateProduct = product => ({
  type: UPDATE_PRODUCT,
  product
});

const deleteProduct = product => ({
  type: DELETE_PRODUCT,
  product
});

export const addProductThunk = params => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', params);
      dispatch(addProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProductThunk = (productId, params) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${productId}`, params);
      dispatch(updateProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProductThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/products/${productId}`);
      dispatch(deleteProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {...state, projects: [...state.projects, action.project]};
    case UPDATE_PRODUCT:
      return {...state, product: action.product};
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      };
    default:
      return state;
  }
}
