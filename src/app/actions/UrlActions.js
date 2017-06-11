import dispatcher from '../dispatchers/dispatcher';

export function createUrl(query, query2) {
  dispatcher.dispatch({
    type: 'CREATE_URL',
    query,
    query2,
  });
}
