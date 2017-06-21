import dispatcher from '../dispatchers/dispatcher';

/**
 * getAuth to store the idToken
 * @return {nothing} returns nothing
 * @export
 * @param {any} idToken
 */
export function getAuth(idToken) {
  dispatcher.dispatch({
    type: 'GET_AUTH',
    idToken,
  });
}
