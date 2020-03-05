/* global describe beforeEach afterEach it */

// not working yet

import {expect} from 'chai';
import {fetchCart} from './cart';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middleware = [thunkMiddleware];
const mockStore = configureMockStore(middleware);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {
    products: [],
    orderId: '',
    loading: true
  };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('fetchCart', () => {
    it('eventually dispatches the SET CART action', async () => {
      const fakeCart = {orderId: 1, productId: 3, quantity: 1};
      const userId = 1;
      mockAxios.onGet(`/api/users/${userId}/cart`).replyOnce(200, fakeCart);
      await store.dispatch(fetchCart(userId));
      const actions = store.getActions();
      console.log(actions);
      expect(actions[0].type).to.be.equal('SET_CART');
      expect(actions[0].productId).to.be.deep.equal(fakeCart.productId);
    });
  });
});
