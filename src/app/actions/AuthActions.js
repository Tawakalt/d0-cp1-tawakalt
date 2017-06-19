import dispatcher from '../dispatchers/dispatcher';

/**
 * 
 * @function getAuth to store the idToken
 * @export
 * @param {any} idToken 
 */
export function getAuth(idToken) {
  dispatcher.dispatch({
    type: 'GET_AUTH',
    idToken,
  });
}
