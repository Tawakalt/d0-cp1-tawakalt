import dispatcher from '../dispatchers/dispatcher.jsx';

export function createUrl(query, query2) {
	dispatcher.dispatch({
		type: 'CREATE_URL',
		query,
		query2,
	});
}
