import { expect } from 'chai';
import AppStore from '../src/app/stores/AppStore2';
import AppDispatcher from '../src/app/dispatchers/dispatcher';

describe('AppActions', () => {
  describe('AppStore', () => {
    it('initializes with no auth', () => {
      expect(AppStore.getAuth()).equal(null);
    });

    it('creates auth', () => {
      AppDispatcher.dispatch({
        type: 'GET_AUTH',
        query: 'query',
      });
      expect(AppStore.getAuth()).equal('query');
    });
  });
});
