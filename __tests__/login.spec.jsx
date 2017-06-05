import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Login from '../src/app/components/Login.jsx';

describe('Login', () => {
  const wrapper = shallow(<Login />);

  it('should have an h1 tag', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should display Sign In with your gmail account and get instant access to news!!! in the h1 tag', () => {
    expect(wrapper.find('h1').text()).equal('Sign In with your gmail account and get instant access to news!!!');
  });

  it('should have a div with class container', () => {
    expect(wrapper.find('.container')).to.have.length(1);
  });

  it('should have a div with id my-signin2', () => {
    expect(wrapper.find('#my-signin2')).to.have.length(1);
  });
});
