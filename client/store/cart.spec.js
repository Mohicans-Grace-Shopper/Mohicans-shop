/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {fetchCart, SET_CART, setCart} from './cart';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middleware = [thunkMiddleware];
const mockStore = configureMockStore(middleware);
const order = {
  orderId: 1,
  products: [{name: 'Amortentia'}, {name: 'Rose Quartz'}]
};

describe('setCart action creator', () => {
  const setCartAction = setCart(order);

  it('returns a Plain Old JavaScript Object', () => {
    expect(typeof setCartAction).to.equal('object');
    expect(Object.getPrototypeOf(setCartAction)).to.equal(Object.prototype);
  });

  it('creates an object with `type` and `cart`', () => {
    expect(setCartAction.type).to.equal(SET_CART);
    // expect(Array.isArray(setCartAction.order.products)).to.be.true;
    expect(setCartAction.order.orderId).to.equal(1);
  });
});
