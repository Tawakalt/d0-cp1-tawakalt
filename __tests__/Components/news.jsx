import React from 'react';
import sinon from 'sinon';
import Request from 'superagent';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import News from '../../src/app/components/News.jsx';
import Utils from '../../src/app/utils';

describe('News Component', () => {

  const wrapper = shallow(<News />);
  const search = wrapper.instance().search();
  const sources = wrapper.instance().sources();
  const updateSources = wrapper.instance().updateSources();
  const updateArticles = wrapper.instance().updateArticles();
  const getSort = wrapper.instance().getSort();
  const componentDidMount = wrapper.instance().componentDidMount();
  const componentWillUnmount = wrapper.instance().componentWillUnmount();
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
    MockRequest = sinon.stub(Request, 'then').callsFake(() => Promise.resolve({ response: 'Successfull' }, { error: 'Successfull' }));
  });
  afterEach(() => {
    MockRequest.restore();
  });

  describe('select input', () => {
    test('should have a ref attribute', () => {
      const options = {createRefMock};
      const tree = renderer.create(<News />, options);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('#sources', () => {
    test('should be called', () => {
      Utils.sources();
      wrapper.setState({sources: {}, sourceSortBy: 'top'});
      expect(sources).toEqual(undefined);
    });
  });

  describe('#search', () => {
    test('should be called', () => {
      Utils.search();
      wrapper.setState({news: []});
      expect(search).toEqual(undefined);
    });
  });

  describe('#updateSources', () => {
    test('should be called', () => {
      expect(updateSources).toEqual(undefined);
    });
  });

  describe('#updateArticles', () => {
    test('should be called', () => {
      expect(updateArticles).toEqual(undefined);
    });
  });

  describe('#getSort', () => {
    wrapper.state().articles = ['a', 'b'];
    test('should be called when a value is selected from the select box', () => {
      wrapper.find('Select').simulate('select');
      expect(getSort).toEqual(undefined);
    });
  });
});
