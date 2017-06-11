import { expect } from 'chai';
import UrlStore from '../src/app/stores/UrlStore';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import * as UrlActions from '../src/app/actions/UrlActions';

describe('UrlActions', () => {
  describe('UrlStore', () => {
    it('gets default source and sortBy values', () => {
      expect(UrlStore.getUrl()).equal('https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=213327409d384371851777e7c7f78dfe');
    });

    it('gets default source url', () => {
      expect(UrlStore.getSourceUrl()).equal('https://newsapi.org/v1/sources?apiKey=213327409d384371851777e7c7f78dfe');
    });

    it('creates url', () => {
      UrlActions.createUrl('mirror', 'top');
      AppDispatcher.dispatch({
        type: 'CREATE_URL',
        query: 'mirror',
        query2: 'top',
      });
      expect(UrlStore.getUrl()).equal('https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=213327409d384371851777e7c7f78dfe');
    });
  });
});
