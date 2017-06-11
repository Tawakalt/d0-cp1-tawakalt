import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import News from '../src/app/components/News.jsx';

describe('News', () => {
  const wrapper = shallow(<News />);
  const updateSearch3 = wrapper.instance().updateSearch3();

  it('should have 2 select inputs', () => {
    expect(wrapper.find('select')).to.have.length(2);
  });

  it('should have 2 label tags', () => {
    expect(wrapper.find('label')).to.have.length(2);
  });

  it('should have 10 div tags', () => {
    expect(wrapper.find('div')).to.have.length(10);
  });

  it('should have 3 p tags', () => {
    expect(wrapper.find('p')).to.have.length(0);
  });

  it('should have an h1 tag', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should display NEWS!!! in the h1 tag', () => {
    expect(wrapper.find('h1').text()).equal('NEWS!!!');
  });

  it('should have a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should have a div with class container', () => {
    expect(wrapper.find('.container')).to.have.length(1);
  });

  it('should have a div with class container', () => {
    expect(wrapper.find('.container-fluid')).to.have.length(1);
  });
});
