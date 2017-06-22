import React from 'react';
import sinon from 'sinon';
import Request from 'superagent';
import { mount } from 'enzyme';
import News from '../src/app/components/News.jsx';
import Utils from '../src/app/utils';

describe('News', () => {

  const wrapper = mount(<News />);
  const updateSearch2 = wrapper.instance().updateSearch2();
  const handleOpenModal = wrapper.instance().handleOpenModal();
  const handleCloseModal = wrapper.instance().handleCloseModal();
  const search = wrapper.instance().search();
  const sources = wrapper.instance().sources();
  const scrape = wrapper.instance().scrape();
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

});
