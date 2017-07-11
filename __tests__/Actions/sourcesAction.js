import * as SourcesActions from '../../src/app/actions/SourcesActions';

describe('SourcesActions', () => {
  describe('#setSources', () => {
    test('should be called with the right parameter', () => {
      const sources = {
        id: 'mirror',
        name: 'Mirror'
      };
      expect(SourcesActions.setSources(sources)).toBeTruthy();
    });
  });
});
