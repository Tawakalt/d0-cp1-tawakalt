import * as UrlActions from '../src/app/actions/UrlActions';

describe('UrlActions', () => {
  test('expect createUrl function to be called', () => {
    expect(UrlActions.createUrl('source', 'sortBy')).toBeTruthy();
  });
});