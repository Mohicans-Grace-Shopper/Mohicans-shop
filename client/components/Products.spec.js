const {expect} = require('chai');
import enzyme, {mount} from 'enzyme';

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import * as rrd from 'react-router-dom';
const {MemoryRouter} = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  products: []
};

import {Products} from './Products';

describe.only('Products component', () => {
  let fakeStore;
  const products = [
    {
      id: 1,
      name: 'Amortentia',
      imageUrl:
        'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731'
    },
    {
      id: 2,
      name: 'Confusing Concoction',
      imageUrl:
        'https://d.wattpad.com/story_parts/699873420/images/158695304eb09911855926916674.jpg'
    },
    {id: 3, name: 'Draught of Living Death'}
  ];
  beforeEach(() => {
    fakeStore = mockStore(initialState);
  });

  describe('<Products /> component', () => {
    it('renders the products passed in as props', () => {
      const wrapper = mount(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <Products
              products={[
                {
                  id: 1,
                  name: 'Amortentia',
                  imageUrl:
                    'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731'
                },
                {
                  id: 2,
                  name: 'Confusing Concoction',
                  imageUrl:
                    'https://d.wattpad.com/story_parts/699873420/images/158695304eb09911855926916674.jpg'
                }
              ]}
            />
          </MemoryRouter>
        </Provider>
      );
      // expect(wrapper.text()).to.include("Amortentia");
      // expect(wrapper.text()).to.include("Confusing Concoction");
      const images = wrapper.find('img').map(node => node.get(0).props.src);
      expect(images).to.include.members([
        'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731',
        'https://d.wattpad.com/story_parts/699873420/images/158695304eb09911855926916674.jpg'
      ]);
    });
  });
});
