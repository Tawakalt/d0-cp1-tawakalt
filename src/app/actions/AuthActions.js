import dispatcher from '../dispatchers/dispatcher';

/**
 * @description dispatches the user token to the store
 * @return {boolean} true
 * @export
 * @param {string} idToken idToken from google response
 */
export function getAuth(idToken) {
  dispatcher.dispatch({
    type: 'GET_AUTH',
    idToken,
  });
  return true;
}
