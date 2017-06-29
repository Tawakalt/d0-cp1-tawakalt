import ScrapeStore from '../../src/app/stores/ScrapeStore';
import AppDispatcher from '../../src/app/dispatchers/dispatcher';

describe('ScrapeActions', () => {
  describe('ScrapeStore', () => {
    test('initializes with no url', () => {
      expect(ScrapeStore.getUrl()).toEqual('');
    });

    test('creates url', () => {
      AppDispatcher.dispatch({
        type: 'SCRAPE_URL',
        url: 'url',
      });
      expect(ScrapeStore.getUrl()).toEqual('https://mercury.postlight.com/parser?url=url');
    });
  });
});
