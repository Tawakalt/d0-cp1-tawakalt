import * as AuthActions from '../src/app/actions/AuthActions';

describe('AuthActions', () => {
  test('expect getAuth function to be called', () => {
    expect(AuthActions.getAuth('token')).toBeTruthy();
  });
});
