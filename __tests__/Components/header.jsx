import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Header from '../../src/app/components/Header.jsx';

require ('../../browserMocks.js');

describe('Header Component', () => {
  const wrapper = mount(<Header />);
  const componentWillMount = wrapper.instance().componentWillMount();
  const componentWillUnmount = wrapper.instance().componentWillUnmount();
  const updateState = wrapper.instance().updateState();

  describe('#updateState', () => {
    test('should be called ', () => {
      expect(updateState).toBe(undefined);
    });

    test('should have no initial value defined for this.state.auth', () => {
      expect(wrapper.state().auth).toEqual(undefined);
    });
  });
});
