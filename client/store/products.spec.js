/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {fetchProducts, fetchProduct} from './products';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = {
    products: [],
    product: {},
    loading: true,
    singleLoading: true
  };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('fetchProducts', () => {
    it('eventually dispatches the SET PRODUCTS action', async () => {
      const fakeProducts = {name: 'Love Potion'};
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts);
      await store.dispatch(fetchProducts());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('SET_PRODUCTS');
      expect(actions[0].products).to.be.deep.equal(fakeProducts);
    });
  });

  // describe.only('fetchProduct', () => {
  //   it('eventually dispatches the SET PRODUCT action', async () => {
  //     const fakeProduct = {id: 1, name: 'Love Potion'};
  //     mockAxios.onGet('/api/products/1').replyOnce(200, fakeProduct);
  //     await store.dispatch(fetchProduct());
  //     const actions = store.getActions();
  //     console.log(actions)
  //     expect(actions.type).to.be.equal('SET_PRODUCT');
  //     expect(actions[0].products).to.be.deep.equal(fakeProduct);
  //   });
  // });
});
