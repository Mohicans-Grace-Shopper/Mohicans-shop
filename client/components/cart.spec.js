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
  items: []
};

import {Cart} from './cart';

describe.only('Cart component', () => {
  let fakeStore;
  const items = [
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
  ];
  beforeEach(() => {
    fakeStore = mockStore(initialState);
  });

  describe('<Cart /> component', () => {
    it('renders the cart products passed in as props', () => {
      const fetchCart = function() {};
      const isLoggedIn = true;
      const loading = false;
      const wrapper = mount(
        <Provider store={fakeStore}>
          <MemoryRouter>
            <Cart
              fetchCart={fetchCart}
              isLoggedIn={isLoggedIn}
              loading={loading}
              items={[
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
      expect(wrapper.text()).to.include('Amortentia');
      const images = wrapper.find('img').map(node => node.get(0).props.src);
      expect(images).to.include.members([
        'https://vignette.wikia.nocookie.net/harrypotter/images/c/c1/Love_Potion_design_for_T-Shirt.jpg/revision/latest/scale-to-width-down/250?cb=20091220170731',
        'https://d.wattpad.com/story_parts/699873420/images/158695304eb09911855926916674.jpg'
      ]);
    });
  });
});
