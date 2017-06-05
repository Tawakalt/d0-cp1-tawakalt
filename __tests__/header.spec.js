import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../src/app/components/Header.jsx';

describe('Header', () => {
  const wrapper = shallow(<Header />);

  it('should declare 2 routes', () => {
    expect(wrapper.find('Route')).to.have.length(2);
  });
});
