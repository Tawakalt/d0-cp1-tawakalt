import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import News from '../src/app/components/News.jsx';

describe('News', () => {
  const wrapper = shallow(<News />);
  const updateSearch2 = wrapper.instance().updateSearch2();
  const handleOpenModal = wrapper.instance().handleOpenModal();
  const handleCloseModal = wrapper.instance().handleCloseModal();
  const scrape = wrapper.instance().scrape();

  test('should have 2 select inputs', () => {
    expect(wrapper.find('select')).toHaveLength(2);
  });

  test('should have 2 label tags', () => {
    expect(wrapper.find('label')).toHaveLength(2);
  });

  test('should have 9 div tags', () => {
    expect(wrapper.find('div')).toHaveLength(10);
  });

  test('should have 3 p tags', () => {
    expect(wrapper.find('p')).toHaveLength(0);
  });

  it('should have an h1 tag', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  test('should display NEWS!!! in the h1 tag', () => {
    expect(wrapper.find('h1').text()).toEqual('NEWS!!!');
  });

  test('should have a button', () => {
    expect(wrapper.find('button')).toHaveLength(3);
  });

  test('should have a div with class container', () => {
    expect(wrapper.find('.container')).toHaveLength(1);
  });
});
