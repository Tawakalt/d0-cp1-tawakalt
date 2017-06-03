import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

class AppStore extends EventEmitter{
  constructor() {
    super ();
    this.query = 'al-jazeera-english';
    this.query2 = 'top';
    this.url = `https://newsapi.org/v1/articles?source=${this.query}&sortBy=${this.query2}&apiKey=213327409d384371851777e7c7f78dfe`;

  }

  createUrl(query, query2) {
    this.url = `https://newsapi.org/v1/articles?source=${query}&sortBy=${query2}&apiKey=213327409d384371851777e7c7f78dfe`;
    this.emit('change');
  }

  getUrl() {
    return this.url;
  }

  handleActions(action) {
    switch(action.type) {
	  case 'CREATE_URL':{
	    this.createUrl(action.query, action.query2);
	  }
    }
  }
}

const appStore = new AppStore;
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;
