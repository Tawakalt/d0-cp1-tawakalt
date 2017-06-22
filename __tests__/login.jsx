import React from 'react';
import { mount } from 'enzyme';
import { GoogleLogin } from 'react-google-login-component';
import Login from '../src/app/components/Login.jsx';
import * as AuthActions from '../src/app/actions/AuthActions';

describe('Login', () => {
  const wrapper = mount(<Login />);
  const componentDidMount = wrapper.instance().componentDidMount();

  test('calls componentDidMount', () => {
    expect(componentDidMount).toEqual(undefined);
  });
});
