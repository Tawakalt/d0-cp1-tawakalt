import dispatcher from '../dispatchers/dispatcher';

/**
 * @description sets the sources gotten from NewsApi
 * @return {boolean} true
 * @export
 * @param {object} sources response from NewsApi
 */
export function setSources(sources) {
  dispatcher.dispatch({
    type: 'GET_SOURCES',
    sources,
  });
  return true;
}
