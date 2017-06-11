import { expect } from 'chai';
import AuthStore from '../src/app/stores/AuthStore';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import * as AuthActions from '../src/app/actions/AuthActions';

describe('AuthActions', () => {
  describe('AuthStore', () => {
    it('initializes with no auth', () => {
      expect(AuthStore.getAuth()).equal(null);
    });

    it('creates auth', () => {
      AuthActions.getAuth('query');
      AppDispatcher.dispatch({
        type: 'GET_AUTH',
        query: 'query',
      });
      expect(AuthStore.getAuth()).equal('query');
    });
  });
});
