import dispatcher from '../dispatchers/dispatcher';

/**
 * @description sets url for Scraping
 * @return {boolean} true
 * @export
 * @param {string} url url to be scraped from
 */
export function createUrl(url) {
  dispatcher.dispatch({
    type: 'SCRAPE_URL',
    url,
  });
  return true;
}
