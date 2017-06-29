import dispatcher from '../dispatchers/dispatcher';

/**
 * @description sets the user token
 * @return {boolean} true
 * @export
 * @param {string} idToken idToken from google
 */
export function getAuth(idToken) {
  dispatcher.dispatch({
    type: 'GET_AUTH',
    idToken,
  });
  return true;
}
