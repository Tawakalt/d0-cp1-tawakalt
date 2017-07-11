import * as AuthActions from '../../src/app/actions/AuthActions';

describe('AuthActions', () => {
  describe('#getAuth', () => {
    test('should be called with the right parameter', () => {
      expect(AuthActions.getAuth('token')).toBeTruthy();
    });
  });
});
