import ScrapedContentsStore from '../../src/app/stores/ScrapedContentsStore';
import AppDispatcher from '../../src/app/dispatchers/dispatcher';

describe('ScrapedContentsStore', () => {
  describe('#getContent', () => {
    test('should exist and return null initially', () => {
      expect(ScrapedContentsStore.getContent()).toBeNull();
    });

    test('should return the dispatched scraped content', () => {
      AppDispatcher.dispatch({
        type: 'GET_CONTENT',
        content: 'content',
      });
      expect(ScrapedContentsStore.getContent()).toEqual('content');
    });
  });
});
