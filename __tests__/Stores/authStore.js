import AuthStore from '../../src/app/stores/AuthStore';
import AppDispatcher from '../../src/app/dispatchers/dispatcher';

describe('AuthActions', () => {
  describe('AuthStore', () => {
    test('initializes with no auth', () => {
      expect(AuthStore.getAuth()).toBeNull();
    });

    test('creates auth', () => {
      AppDispatcher.dispatch({
        type: 'GET_AUTH',
        idToken: 'idToken',
      });
      expect(AuthStore.getAuth()).toEqual('idToken');
    });
  });
});
