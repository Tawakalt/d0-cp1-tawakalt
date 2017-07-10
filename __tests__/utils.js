import sinon from 'sinon';
import Request from 'superagent';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import Utils from '../src/app/utils';

describe('Utils Class', () => {
  let DispatcherMock;
  let MockRequest;
  const ApiGetSources = sinon.spy(Utils, 'sources');
  const ApiGetArticles = sinon.spy(Utils, 'search');

  beforeEach(() => {
    DispatcherMock = sinon.spy(AppDispatcher, 'dispatch');
    MockRequest = sinon.stub(Request, 'get').callsFake(() => Promise.resolve({ response: 'Successfull' }, { error: 'Error' }));
  });
  afterEach(() => {
    MockRequest.restore();
    DispatcherMock.restore();
  });

  describe('#ApiGetSources', () => {
    it('should be called', () => {
      Utils.sources();
      expect(ApiGetSources.called).toBeTruthy();
    });
  });

  describe('#ApiGetArticles', () => {
    it('should be called', () => {
      Utils.search();
      expect(ApiGetArticles.called).toBeTruthy();
    });
  });
});
