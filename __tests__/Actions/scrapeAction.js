import * as ScrapeActions from '../../src/app/actions/ScrapeActions';

describe('ScrapeActions', () => {
  describe('createUrl', () => {
    test('expect createUrl to be called with the right parameter', () => {
      expect(ScrapeActions.createUrl('url')).toBeTruthy();
    });
  });
});
