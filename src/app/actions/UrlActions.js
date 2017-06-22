import dispatcher from '../dispatchers/dispatcher';

/**
 * createUrl for newsApi call
 * @return {nothing} does not return anything
 * @export
 * @param {any} source
 * @param {any} sortBy
 */
export function createUrl(source, sortBy) {
  dispatcher.dispatch({
    type: 'CREATE_URL',
    source,
    sortBy,
  });
  return true;
}
