import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Header from '../../src/app/components/Header.jsx';

describe('Header', () => {
  const wrapper = mount(<Header />);
  const spyWillMount = sinon.spy(Header.prototype, 'componentWillMount');
  const spyWillUnmount = sinon.spy(Header.prototype, 'componentWillUnmount');
  const spyWillUpdateState = sinon.spy(Header.prototype, 'updateState');


  test('componentWillMount should be called before mount', () => {
    wrapper.instance().componentWillMount();
    expect(spyWillMount.calledOnce).toBe(true);
  });

  test('updateState should be called ', () => {
    wrapper.instance().updateState();
    expect(spyWillUpdateState.calledOnce).toBe(false);
  });

  test('should have no state', () => {
    expect(wrapper.state().auth).toBeNull();
  });

  test('componentWillUnmount should be called when component is unmounted', () => {
    wrapper.unmount();
    expect(spyWillUnmount.calledOnce).toBe(true);
  });
});
