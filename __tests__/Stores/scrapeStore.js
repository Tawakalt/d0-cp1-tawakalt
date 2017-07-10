import ScrapeStore from '../../src/app/stores/ScrapeStore';
import AppDispatcher from '../../src/app/dispatchers/dispatcher';

describe('ScrapeStore', () => {
  describe('#getUrl', () => {
    test('should exist and return an empty string initially', () => {
      expect(ScrapeStore.getUrl()).toEqual('');
    });

    test('should return the dispatched scrape url', () => {
      AppDispatcher.dispatch({
        type: 'SCRAPE_URL',
        url: 'url',
      });
      expect(ScrapeStore.getUrl()).toEqual('https://mercury.postlight.com/parser?url=url');
    });
  });
});
