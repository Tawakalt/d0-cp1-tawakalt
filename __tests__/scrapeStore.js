import ScrapeStore from '../src/app/stores/ScrapeStore';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import * as ScrapeActions from '../src/app/actions/ScrapeActions';

describe('ScrapeActions', () => {
  describe('ScrapeStore', () => {
    test('initializes with no url', () => {
      expect(ScrapeStore.getUrl()).toEqual('');
    });

    test('creates url', () => {
      ScrapeActions.createUrl('url');
      AppDispatcher.dispatch({
        type: 'SCRAPE_URL',
        url: 'url',
      });
      expect(ScrapeStore.getUrl()).toEqual('https://mercury.postlight.com/parser?url=url');
    });
  });
});
