import dispatcher from '../dispatchers/dispatcher';

/**
 * @description dispatches url for newsApi call to the store
 * @return {boolean} true
 * @export
 * @param {string} source selected news source
 * @param {string} sortBy selected sortyby options for the news source
 */
export function createUrl(source, sortBy) {
  dispatcher.dispatch({
    type: 'CREATE_URL',
    source,
    sortBy,
  });
  return true;
}
