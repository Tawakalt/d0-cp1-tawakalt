import dispatcher from '../dispatchers/dispatcher';

/**
 * @description sets the content gotten from MercuryApi during scraping
 * @return {boolean} true
 * @export
 * @param {object} content response from NewsApi
 */
export function setScrapedContent(content) {
  dispatcher.dispatch({
    type: 'GET_CONTENT',
    content,
  });
  return true;
}
