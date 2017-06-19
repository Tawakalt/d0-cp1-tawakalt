import UrlStore from '../src/app/stores/UrlStore';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import * as UrlActions from '../src/app/actions/UrlActions';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

describe('UrlActions', () => {
  describe('UrlStore', () => {
    test('gets default source and sortBy values', () => {
      expect(UrlStore.getUrl()).toEqual(`https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=${NEWS_API_KEY}`);
    });

    test('gets default source url', () => {
      expect(UrlStore.getSourceUrl()).toEqual(`https://newsapi.org/v1/sources?apiKey=${NEWS_API_KEY}`);
    });

    test('creates url', () => {
      UrlActions.createUrl('mirror', 'top');
      AppDispatcher.dispatch({
        type: 'CREATE_URL',
        source: 'mirror',
        sortBy: 'top',
      });
      expect(UrlStore.getUrl()).toEqual(`https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=${NEWS_API_KEY}`);
    });
  });
});
