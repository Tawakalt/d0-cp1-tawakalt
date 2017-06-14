import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

class UrlStore extends EventEmitter {
  constructor() {
    super();
    this.query = 'abc-news-au';
    this.query2 = 'top';
    this.sourceUrl = 'https://newsapi.org/v1/sources?apiKey=213327409d384371851777e7c7f78dfe';
    this.url = `https://newsapi.org/v1/articles?source=${this.query}&sortBy=${this.query2}&apiKey=213327409d384371851777e7c7f78dfe`;
  }

  createUrl(query, query2) {
    this.url = `https://newsapi.org/v1/articles?source=${query}&sortBy=${query2}&apiKey=213327409d384371851777e7c7f78dfe`;
    this.emit('change');
  }

  getUrl() {
    return this.url;
  }

  getSourceUrl() {
    return this.sourceUrl;
  }

  handleActions(action) {
    switch (action.type) {
      case 'CREATE_URL': {
        this.createUrl(action.query, action.query2);
      }
    }
  }
}

const urlStore = new UrlStore();
dispatcher.register(urlStore.handleActions.bind(urlStore));
export default urlStore;
