import 'jsdom-global/register';
const {expect} = require('chai');
import enzyme, {mount} from 'enzyme';

import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import * as rrd from 'react-router-dom';
const {MemoryRouter} = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  product: []
};

import {SingleProduct} from './SingleProduct';

describe('Products component', () => {
  let fakeStore;
  const product = {
    id: 1,
    name: 'Amortentia',
    imageUrl:
      'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731'
  };
  beforeEach(() => {
    fakeStore = mockStore(initialState);
  });

  describe('<SingleProducts /> component', () => {
    it('renders the single product passed in as props', () => {
      const fetchProduct = function() {};
      const wrapper = mount(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <SingleProduct
              fetchProduct={fetchProduct(1)}
              product={{
                id: 1,
                name: 'Amortentia',
                imageUrl:
                  'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731'
              }}
            />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.text()).to.include('Amortentia');
      const images = wrapper.find('img').map(node => node.get(0).props.src);
      expect(images).to.include.members([
        'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731'
      ]);
    });
  });
});
