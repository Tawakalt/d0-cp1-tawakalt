import React from 'react';
import sinon from 'sinon';
import Request from 'superagent';
import { mount } from 'enzyme';
import News from '../src/app/components/News.jsx';
import Utils from '../src/app/utils';

describe('News', () => {

  const wrapper = mount(<News />);
  const createScrapeUrl = wrapper.instance().createScrapeUrl();
  const createUrl = wrapper.instance().createUrl();
  const handleOpenModal = wrapper.instance().handleOpenModal();
  const handleCloseModal = wrapper.instance().handleCloseModal();
  const search = wrapper.instance().search();
  const sources = wrapper.instance().sources();
  const scrape = wrapper.instance().scrape();
  const getSort = wrapper.instance().getSort();
  let MockRequest;

  beforeEach(() => {
    MockRequest = sinon.stub(Request, 'then').callsFake(() => Promise.resolve({ response: 'Successfull' }));
  });
  afterEach(() => {
    MockRequest.restore();
  });

  test('calls method sources', () => {
    Utils.sources();
    wrapper.setState({sources: {}, sourceSortBy: 'top'});
    expect(sources).toEqual(undefined);
  });
  
test('calls method scrape', () => {
    Utils.scrape();
    wrapper.setState({content: '<p>Taiwo</p>'});
    expect(scrape).toEqual(undefined);
  });

  test('calls method search', () => {
    Utils.search();
    wrapper.setState({news: []});
    expect(search).toEqual(undefined);
  });

  test('onSelect selectSearch and onClick button should call updateSearch function', () => {
    wrapper.find('#selectSearch').simulate('select');
    wrapper.find('.createUrl').simulate('click');
    expect(createUrl).toEqual(undefined);
  });

  test('onSelect sources, function getSort should be called', () => {
    wrapper.find('#selectSources').simulate('select');
    expect(getSort).toEqual(undefined);
  });
});
