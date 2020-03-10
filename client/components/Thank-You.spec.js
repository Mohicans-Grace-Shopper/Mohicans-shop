/* global describe beforeEach it */
import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ThankYou from './ThankYou';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('ThankYou', () => {
  let thankYou;

  beforeEach(() => {
    thankYou = shallow(<ThankYou />);
  });

  it('renders the message in an h2', () => {
    expect(thankYou.find('h2').text()).to.be.equal(
      'Thank you for your magical purchase!'
    );
  });
});
