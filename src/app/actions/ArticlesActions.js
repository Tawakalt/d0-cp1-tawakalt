import dispatcher from '../dispatchers/dispatcher';

/**
 * @description sets the articles gotten from NewsApi
 * @return {boolean} true
 * @export
 * @param {object} articles response from NewsApi
 */
export function setArticles(articles) {
  dispatcher.dispatch({
    type: 'GET_ARTICLES',
    articles,
  });
  return true;
}
