import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Navbar from '../../src/app/components/Navbar.jsx';
import Utils from '../../src/app/utils';
require ('../../browserMocks.js');


describe('Navbar', () => {
  const wrapper = mount(<Navbar />);

  test('onClick button, function logout should be called', () => {
    wrapper.find('.logout').simulate('click');
    expect(Utils.logout()).toEqual(undefined);
  });
});
