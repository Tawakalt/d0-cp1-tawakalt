import React from 'react';
import { shallow } from 'enzyme';
import { GoogleLogin } from 'react-google-login-component';
import Login from '../src/app/components/Login.jsx';
import * as AuthActions from '../src/app/actions/AuthActions';

describe('Login', () => {
  const wrapper = shallow(<Login />);
  const componentDidMount = wrapper.instance().componentDidMount();
  
  test('should have an h1 tag', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  test('should display Sign In with your gmail account and get instant access to news!!! in the h1 tag', () => {
    expect(wrapper.find('h1').text()).toEqual('Sign In with your gmail account and get instant access to news!!!');
  });

  test('should have a div with class container', () => {
    expect(wrapper.find('.container')).toHaveLength(1);
  });

  test('should have a div with id my-signin2', () => {
    expect(wrapper.find('#my-signin2')).toHaveLength(1);
  });
});
