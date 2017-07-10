import AuthStore from '../../src/app/stores/AuthStore';
import AppDispatcher from '../../src/app/dispatchers/dispatcher';

describe('AuthStore', () => {
  describe('#getAuth', () => {
    test('should exist and return null initially', () => {
      expect(AuthStore.getAuth()).toBeNull();
    });

    test('should return the dispatched idToken', () => {
      AppDispatcher.dispatch({
        type: 'GET_AUTH',
        idToken: 'idToken',
      });
      expect(AuthStore.getAuth()).toEqual('idToken');
    });
  });
});
