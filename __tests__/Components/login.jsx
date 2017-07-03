import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../src/app/components/Login.jsx';
import * as AuthActions from '../../src/app/actions/AuthActions';

describe('Login', () => {
  const wrapper = shallow(<Login />);

  test('should have a GoogleLogin tag ', () => {
    expect(wrapper.find('GoogleLogin')).toHaveLength(1);
  });
});
