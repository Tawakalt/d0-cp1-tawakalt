import { expect } from 'chai';
import AppStore from '../src/app/stores/AppStore';
import AppDispatcher from '../src/app/dispatchers/dispatcher';
import * as AppActions from '../src/app/actions/AppActions';

describe('AppActions', () => {
  describe('AppStore', () => {
    it('gets default source and sortBy values', () => {
      expect(AppStore.getUrl()).equal('https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=213327409d384371851777e7c7f78dfe');
    });

    it('gets default source url', () => {
      expect(AppStore.getSourceUrl()).equal('https://newsapi.org/v1/sources?apiKey=213327409d384371851777e7c7f78dfe');
    });

    it('creates url', () => {
      AppActions.createUrl('mirror', 'top');
      AppDispatcher.dispatch({
        type: 'CREATE_URL',
        query: 'mirror',
        query2: 'top',
      });
      expect(AppStore.getUrl()).equal('https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=213327409d384371851777e7c7f78dfe');
    });
  });
});
