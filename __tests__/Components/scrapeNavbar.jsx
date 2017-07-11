import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import ScrapeNavbar from '../../src/app/components/ScrapeNavbar.jsx';

describe('ScrapeNavbar Component', () => {
  const wrapper = mount(<ScrapeNavbar />);

  test('should have a button tag ', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });
});
