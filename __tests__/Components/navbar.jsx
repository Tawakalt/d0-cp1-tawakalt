import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Navbar from '../../src/app/components/Navbar.jsx';
import Utils from '../../src/app/utils';
require ('../../browserMocks.js');


describe('Navbar Component', () => {
  const wrapper = mount(<Navbar />);

  describe('#logout', () => {
    test('should be called on Click of a button', () => {
      wrapper.find('.logout').simulate('click');
      expect(Utils.logout()).toEqual(undefined);
    });
  });
});
