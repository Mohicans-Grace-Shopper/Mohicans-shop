/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {addProductThunk} from './adminstore';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middleware = [thunkMiddleware];
const mockStore = configureMockStore(middleware);

describe('thunk creators', () => {
  const newProduct = {id: 1, name: 'Love Potion', price: 150};

  let store;
  let mockAxios;

  const initialState = {
    products: []
  };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('addProductThunk', () => {
    it('eventually dispatches the ADD PRODUCT action', async () => {
      mockAxios.onPost('/api/products').replyOnce(201, newProduct);
      await store.dispatch(addProductThunk(newProduct));
      const actions = store.getActions();
      console.log(actions);
      expect(actions[0].type).to.equal('ADD_PRODUCT');
      expect(actions[0].products).to.deep.equal(newProduct);
    });
  });
});
