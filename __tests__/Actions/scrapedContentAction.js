import * as ScrapedContentAction from '../../src/app/actions/ScrapedContentAction';

describe('ScrapedContentAction', () => {
  describe('#setArticles', () => {
    test('should be called with the right parameter', () => {
      const content = {
        fullArticle: '<h3>Taiwo is an Andelan!!!</h3><p>Yeah, she is</p>',
      };
      expect(ScrapedContentAction.setScrapedContent(content)).toBeTruthy();
    });
  });
});
