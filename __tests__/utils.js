import sinon from 'sinon';
import Request from 'superagent';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import Utils from '../src/app/utils';

describe('When Actions', () => {
  let DispatcherMock;
  let MockRequest;
  const ApiGetSources = sinon.spy(Utils, 'sources');
  const ApiGetArticles = sinon.spy(Utils, 'search');

  beforeEach(() => {
    DispatcherMock = sinon.spy(AppDispatcher, 'dispatch');
    MockRequest = sinon.stub(Request, 'get').callsFake(() => Promise.resolve({ response: 'Successfull' }));
  });
  afterEach(() => {
    MockRequest.restore();
    DispatcherMock.restore();
  });

  describe('Creator Method,', () => {
    it('getSources is called, ApiGetSources to be called', () => {
      Utils.sources();
      expect(ApiGetSources.called).toBeTruthy();
    });
    it('getArticles is called, ApiGetArticles to be called', () => {
      Utils.search();
      expect(ApiGetArticles.called).toBeTruthy();
    });
  });
});
