import React from 'react';
import sinon from 'sinon';
import Request from 'superagent';
import { mount } from 'enzyme';
import MapNews from '../../src/app/components/MapNews.jsx';
import Utils from '../../src/app/utils';


describe('News', () => {

  const wrapper = mount(<MapNews />);
  const createScrapeUrl = wrapper.instance().createScrapeUrl();
  const handleOpenModal = wrapper.instance().handleOpenModal();
  const handleCloseModal = wrapper.instance().handleCloseModal();
  const scrape = wrapper.instance().scrape();
  let MockRequest;

  beforeEach(() => {
    MockRequest = sinon.stub(Request, 'then').callsFake(() => Promise.resolve({ response: 'Successfull' }, { error: 'Error' }));
  });
  afterEach(() => {
    MockRequest.restore();
  });
  
  test('calls method scrape', () => {
    Utils.scrape();
    wrapper.setState({content: '<p>Taiwo</p>'});
    expect(scrape).toEqual(undefined);
  });
});
