import * as ArticlesActions from '../../src/app/actions/ArticlesActions';

describe('ArticlesActions', () => {
  describe('#setArticles', () => {
    test('it should be called with the right parameter', () => {
      const articles = {
        title: 'Taiwo is an Andelan!!!',
        url: 'taiwo.com',
        imageUrl: 'taiwo.com/image'
      };
      expect(ArticlesActions.setArticles(articles)).toBeTruthy();
    });
  });
});
