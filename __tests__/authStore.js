import AuthStore from '../src/app/stores/AuthStore';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import * as AuthActions from '../src/app/actions/AuthActions';

describe('AuthActions', () => {
  describe('AuthStore', () => {
    test('initializes with no auth', () => {
      expect(AuthStore.getAuth()).toBeNull();
    });

    test('creates auth', () => {
      AuthActions.getAuth('idToken');
      AppDispatcher.dispatch({
        type: 'GET_AUTH',
        idToken: 'idToken',
      });
      expect(AuthStore.getAuth()).toEqual('idToken');
    });
  });
});
