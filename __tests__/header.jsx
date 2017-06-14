import React from 'react';
import { shallow } from 'enzyme';
import Header from '../src/app/components/Header.jsx';

describe('Header', () => {
  const wrapper = shallow(<Header />);
  const updateState = wrapper.instance().updateState();
  const componentWillUnmount = wrapper.instance().componentWillUnmount();
  

  test('should define updateState function', () => {
    expect(updateState).toBeUndefined();
  });
  test('should have no state', () => {
    expect(wrapper.state().auth).toBeNull();
  });

  test('should declare 2 routes', () => {
    expect(wrapper.find('Route')).toHaveLength(2);
  });

  test('should declare 1 Router', () => {
    expect(wrapper.find('Router')).toHaveLength(0);
  });

  test('should have 2 div tags', () => {
    expect(wrapper.find('div')).toHaveLength(2);
  });
});
