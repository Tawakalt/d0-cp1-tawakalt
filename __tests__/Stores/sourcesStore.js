import SourcesStore from '../../src/app/stores/SourcesStore';
import AppDispatcher from '../../src/app/dispatchers/dispatcher';

describe('SourcesStore', () => {
  describe('#getSources', () => {
    test('should exist and initiall return null', () => {
      expect(SourcesStore.getSources()).toBeNull();
    });

    test('should return the dispatched sources', () => {
      AppDispatcher.dispatch({
        type: 'GET_SOURCES',
        sources: 'sources',
      });
      expect(SourcesStore.getSources()).toEqual('sources');
    });
  });

  describe('#getSourceSortBy', () => {
    test('should return the default sortby option', () => {
      expect(SourcesStore.getSourceSortBy()).toEqual(['top']);
    });
  });
});
