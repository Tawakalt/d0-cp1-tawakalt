import dispatcher from '../dispatchers/dispatcher';

export function getAuth(query) {
  dispatcher.dispatch({
    type: 'GET_AUTH',
    query,
  });
}
