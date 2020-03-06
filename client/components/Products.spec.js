import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Products} from './Products';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Products component', () => {
  const productRecords = [
    {name: 'Amortentia'},
    {name: 'Confusing Concoction'},
    {name: 'Draught of Living Death'}
  ];

  it('renders an unordered list of products', () => {
    const wrapper = shallow(<Products products={productRecords} />);
    expect(wrapper.find('ul')).to.have.length(1);
  });

  it('renders list items for the products passed in as props', async () => {
    const wrapper = shallow(<Products products={productRecords} />);
    const listProducts = wrapper.find('div');
    expect(listProducts).to.have.length(3);
    expect(listProducts.at(2).text()).to.contain('Confusing Concoction');
  });
});
