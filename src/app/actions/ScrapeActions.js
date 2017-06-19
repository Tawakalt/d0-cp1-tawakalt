import dispatcher from '../dispatchers/dispatcher';

/**
 * 
 * @function createUrl for Scraping
 * @export
 * @param {any} url 
 */
export function createUrl(url) {
  dispatcher.dispatch({
    type: 'SCRAPE_URL',
    url,
  });
}
