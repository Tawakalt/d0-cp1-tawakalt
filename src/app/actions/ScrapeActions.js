import dispatcher from '../dispatchers/dispatcher';

/**
 * @description dispatches url for Scraping to the store
 * @return {boolean} true
 * @export
 * @param {string} url articles url to be scraped from
 */
export function createUrl(url) {
  dispatcher.dispatch({
    type: 'SCRAPE_URL',
    url,
  });
  return true;
}
