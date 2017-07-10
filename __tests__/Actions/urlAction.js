import * as UrlActions from '../../src/app/actions/UrlActions';

describe('UrlActions', () => {
  describe('#createUrl', () => {
    test('should be called with the right parameter', () => {
      expect(UrlActions.createUrl('source', 'sortBy')).toBeTruthy();
    });
  });
});
