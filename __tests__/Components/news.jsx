import React from 'react';
import sinon from 'sinon';
import Request from 'superagent';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import News from '../../src/app/components/News.jsx';
import Utils from '../../src/app/utils';

describe('News', () => {

  const wrapper = shallow(<News />);
  const search = wrapper.instance().search();
  const sources = wrapper.instance().sources();
  const getSort = wrapper.instance().getSort();
  let MockRequest;

  function createRefMock(element) {
  if (element.type === 'select') {
    return {
      focus() {},
    };
  }
  return null;
}

  beforeEach(() => {
    MockRequest = sinon.stub(Request, 'then').callsFake(() => Promise.resolve({ response: 'Successfull' }));
  });
  afterEach(() => {
    MockRequest.restore();
  });

  test('renders correctly', () => {
  const options = {createRefMock};
  const tree = renderer.create(<News />, options);
  expect(tree).toMatchSnapshot();
});

  test('calls method sources', () => {
    Utils.sources();
    wrapper.setState({sources: {}, sourceSortBy: 'top'});
    expect(sources).toEqual(undefined);
  });

  test('calls method search', () => {
    Utils.search();
    wrapper.setState({news: []});
    expect(search).toEqual(undefined);
  });

  test('onSelect sources, function getSort should be called', () => {
    wrapper.find('Select').simulate('select');
    expect(getSort).toEqual(undefined);
  });

  
});
