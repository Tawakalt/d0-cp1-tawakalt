import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

/**
 * @description Stores NewsApi Url-Related Details
 * @class
 * @extends {EventEmitter}
 */
class UrlStore extends EventEmitter {
  /**
   * @description Creates an instance of UrlStore.
   * @memberof UrlStore
   */
  constructor() {
    super();
    this.source = 'abc-news-au';
    this.sortBy = 'top';
    this.sourceUrl = `https://newsapi.org/v1/sources?apiKey=${NEWS_API_KEY}`;
    this.url = `https://newsapi.org/v1/articles?source=${this.source}&sortBy=${this.sortBy}&apiKey=${NEWS_API_KEY}`;
  }

  /**
   * @description Reconstructs url based on the selected source and sortBy option
   * @returns {void}
   * @param {string} source the selected news source to make the API call
   * @param {string} sortBy the selected sortBy option for the news source to make the API call
   * @memberof UrlStore
   */
  createUrl(source, sortBy) {
    this.url = `https://newsapi.org/v1/articles?source=${source}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`;
    this.emit('change');
  }

  /**
   * @description Returns the url
   * @returns {string} this.url - url needed to make the articles API call
   * @memberof UrlStore
   */
  getUrl() {
    return this.url;
  }

  /**
   * @description Returns the source url
   * @returns {string} this.sourceUrl - url needed to make the source API call
   * @memberof UrlStore
   */
  getSourceUrl() {
    return this.sourceUrl;
  }

  /**
   * @description Handles Url actions
   * @returns {void}
   * @param {function} action the dispatched action
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
