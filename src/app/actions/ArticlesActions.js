import dispatcher from '../dispatchers/dispatcher';

/**
 * @description dispatches the articles gotten from NewsApi to the store
 * @return {boolean} true
 * @export
 * @param {object} articles news article response from NewsApi
 */
export function setArticles(articles) {
  dispatcher.dispatch({
    type: 'GET_ARTICLES',
    articles,
  });
  return true;
}
