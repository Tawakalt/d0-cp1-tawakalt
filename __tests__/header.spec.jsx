import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../src/app/components/Header.jsx';

describe('Header', () => {
  const wrapper = shallow(<Header />);
  const updateState = wrapper.instance().updateState();
  

  it('should declare 2 routes', () => {
    expect(wrapper.find('Route')).to.have.length(3);
  });

  it('should declare 1 Router', () => {
    expect(wrapper.find('Router')).to.have.length(0);
  });

  it('should have 2 div tags', () => {
    expect(wrapper.find('div')).to.have.length(2);
  });
});
