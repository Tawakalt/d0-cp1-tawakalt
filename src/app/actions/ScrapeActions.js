import dispatcher from '../dispatchers/dispatcher';

export function createUrl(url) {
  dispatcher.dispatch({
    type: 'SCRAPE_URL',
    url,
  });
}
