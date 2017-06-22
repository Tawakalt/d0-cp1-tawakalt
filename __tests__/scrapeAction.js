import * as ScrapeActions from '../src/app/actions/ScrapeActions';

describe('ScrapeActions', () => {
  test('expect createUrl to be called', () => {
    expect(ScrapeActions.createUrl('url')).toBeTruthy();
  });
});
