const initState = [];

const SET_CART = 'SET_CART';

const setCart = (products) => ({
  type: SET_CART,
  products
})

export default function (state = initState, action) {
  switch (action.type) {
    case SET_CART:
      return action.products;
    default:
      return state;
  }
}

export const fetchCart = function() {
  return async function (dispatch) {
    console.log('hi');
    const cartArray = await JSON.parse(window.localStorage.products);
    dispatch(setCart(cartArray));
  }
}
