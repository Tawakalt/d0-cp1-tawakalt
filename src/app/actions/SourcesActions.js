import dispatcher from '../dispatchers/dispatcher';

/**
 * @description dispatches the sources gotten from NewsApi to the store
 * @return {boolean} true
 * @export
 * @param {object} sources news sources from NewsApi
 */
export function setSources(sources) {
  dispatcher.dispatch({
    type: 'GET_SOURCES',
    sources,
  });
  return true;
}
