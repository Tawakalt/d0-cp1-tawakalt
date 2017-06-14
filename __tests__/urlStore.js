import UrlStore from '../src/app/stores/UrlStore';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import * as UrlActions from '../src/app/actions/UrlActions';

describe('UrlActions', () => {
  describe('UrlStore', () => {
    test('gets default source and sortBy values', () => {
      expect(UrlStore.getUrl()).toEqual('https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=213327409d384371851777e7c7f78dfe');
    });

    test('gets default source url', () => {
      expect(UrlStore.getSourceUrl()).toEqual('https://newsapi.org/v1/sources?apiKey=213327409d384371851777e7c7f78dfe');
    });

    test('creates url', () => {
      UrlActions.createUrl('mirror', 'top');
      AppDispatcher.dispatch({
        type: 'CREATE_URL',
        query: 'mirror',
        query2: 'top',
      });
      expect(UrlStore.getUrl()).toEqual('https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=213327409d384371851777e7c7f78dfe');
    });
  });
});
