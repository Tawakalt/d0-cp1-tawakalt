import dispatcher from '../dispatchers/dispatcher.jsx';

export function getAuth(query) {
	dispatcher.dispatch({
		type: 'GET_AUTH',
		query,
	});
}
