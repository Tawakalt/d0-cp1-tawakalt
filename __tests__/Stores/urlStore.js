import UrlStore from '../../src/app/stores/UrlStore';
import AppDispatcher from '../../src/app/dispatchers/dispatcher';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

describe('UrlStore', () => {
  describe('#getUrl', () => {
    test('should exist and return the default url', () => {
      expect(UrlStore.getUrl()).toEqual(`https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=${NEWS_API_KEY}`);
    });

    test('should return a url based on the dispatched parameters', () => {
      AppDispatcher.dispatch({
        type: 'CREATE_URL',
        source: 'mirror',
        sortBy: 'top',
      });
      expect(UrlStore.getUrl()).toEqual(`https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=${NEWS_API_KEY}`);
    });
  });

  describe('#getSourceUrl', () => {
    test('should exist and return the default source url', () => {
      expect(UrlStore.getSourceUrl()).toEqual(`https://newsapi.org/v1/sources?apiKey=${NEWS_API_KEY}`);
    });
  });
});
