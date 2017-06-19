import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

/**
 * @class UrlStore
 * @extends {EventEmitter}
 */
class UrlStore extends EventEmitter {
  constructor() {
    super();
    this.source = 'abc-news-au';
    this.sortBy = 'top';
    this.sourceUrl = `https://newsapi.org/v1/sources?apiKey=${NEWS_API_KEY}`;
    this.url = `https://newsapi.org/v1/articles?source=${this.source}&sortBy=${this.sortBy}&apiKey=${NEWS_API_KEY}`;
  }

  /**
   * @param {string} source 
   * @param {string} sortBy 
   * @memberof UrlStore
   */
  createUrl(source, sortBy) {
    this.url = `https://newsapi.org/v1/articles?source=${source}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`;
    this.emit('change');
  }

  /**
   * @returns {string} this.url
   * @memberof UrlStore
   */
  getUrl() {
    return this.url;
  }

  /**
   * @returns {string} this.sourceUrl
   * @memberof UrlStore
   */
  getSourceUrl() {
    return this.sourceUrl;
  }

  /**
   * @param {function} action 
   * @memberof UrlStore
   */
  handleActions(action) {
    switch (action.type) {
      case 'CREATE_URL': {
        this.createUrl(action.source, action.sortBy);
      }
    }
  }
}

const urlStore = new UrlStore();
dispatcher.register(urlStore.handleActions.bind(urlStore));
export default urlStore;
