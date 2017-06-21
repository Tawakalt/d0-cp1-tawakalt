import dispatcher from '../dispatchers/dispatcher';

/**
 * createUrl for Scraping
 * @return {nothing} returns nothing
 * @export
 * @param {any} url
 */
export function createUrl(url) {
  dispatcher.dispatch({
    type: 'SCRAPE_URL',
    url,
  });
}
