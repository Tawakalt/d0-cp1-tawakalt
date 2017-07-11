import ArticlesStore from '../../src/app/stores/ArticlesStore';
import AppDispatcher from '../../src/app/dispatchers/dispatcher';

describe('ArticlesStore', () => {
  describe('ArticlesStore', () => {
    test('should exist and returns null', () => {
      expect(ArticlesStore.getArticles()).toBeNull();
    });

    test('should return the dispatched articles', () => {
      AppDispatcher.dispatch({
        type: 'GET_ARTICLES',
        articles: 'articles',
      });
      expect(ArticlesStore.getArticles()).toEqual('articles');
    });
  });
});
