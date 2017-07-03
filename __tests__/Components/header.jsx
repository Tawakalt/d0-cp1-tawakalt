import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Header from '../../src/app/components/Header.jsx';

require ('../../browserMocks.js');

describe('Header', () => {
  const wrapper = mount(<Header />);
  const spyWillUpdateState = sinon.spy(Header.prototype, 'updateState');

  test('updateState should be called ', () => {
    wrapper.instance().updateState();
    expect(spyWillUpdateState.calledOnce).toBe(false);
  });

  test('should have no state', () => {
    expect(wrapper.state().auth).toEqual(undefined);
  });
});
