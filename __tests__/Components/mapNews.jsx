import React from 'react';
import sinon from 'sinon';
import Request from 'superagent';
import { mount } from 'enzyme';
import MapNews from '../../src/app/components/MapNews.jsx';
import Utils from '../../src/app/utils';


describe('mapNews Component', () => {

  const wrapper = mount(<MapNews />);
  const createScrapeUrl = wrapper.instance().createScrapeUrl();
  const handleOpenModal = wrapper.instance().handleOpenModal();
  const handleCloseModal = wrapper.instance().handleCloseModal();
  const scrape = wrapper.instance().scrape();
  const updateContent = wrapper.instance().updateContent();
  const componentDidMount = wrapper.instance().componentDidMount();
  const componentWillUnmount = wrapper.instance().componentWillUnmount();
  let MockRequest;

  beforeEach(() => {
    MockRequest = sinon.stub(Request, 'then').callsFake(() => Promise.resolve({ response: 'Successfull' }, { error: 'Error' }));
  });
  afterEach(() => {
    MockRequest.restore();
  });
  
  describe('#scrape', () => {
    test('Should be called', () => {
      Utils.scrape();
      expect(scrape).toEqual(undefined);
    });
  });

  describe('#updateContent', () => {
    test('Should be called', () => {
      expect(updateContent).toEqual(undefined);
    });
  });
});
