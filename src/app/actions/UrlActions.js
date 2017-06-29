import dispatcher from '../dispatchers/dispatcher';

/**
 * @description sets url for newsApi call
 * @return {boolean} true
 * @export
 * @param {string} source Article source
 * @param {string} sortBy sortyby option
 */
export function createUrl(source, sortBy) {
  dispatcher.dispatch({
    type: 'CREATE_URL',
    source,
    sortBy,
  });
  return true;
}
