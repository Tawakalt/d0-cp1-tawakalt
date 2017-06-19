import dispatcher from '../dispatchers/dispatcher';

/**
 * 
 * @function createUrl for newsApi call
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
}
