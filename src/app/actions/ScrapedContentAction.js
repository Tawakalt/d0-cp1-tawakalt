import dispatcher from '../dispatchers/dispatcher';

/**
 * @description dispatches the content gotten from MercuryApi during scraping to the store
 * @return {boolean} true
 * @export
 * @param {object} content scraped content from MercuryApi
 */
export function setScrapedContent(content) {
  dispatcher.dispatch({
    type: 'GET_CONTENT',
    content,
  });
  return true;
}
