import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

/**
 * @description Stores Articles from NewsApi
 * @class
 * @extends {EventEmitter}
 */
class ArticlesStore extends EventEmitter {
  /**
   * @description Creates an instance of ArticlesStore.
   * @memberof ArticlesStore
   */
  constructor() {
    super();
    this.articles = null;
  }

  /**
   * @description Reassigns this.articles to the response from NewsApi
   * @returns {void}
   * @param {string} articles articles from the API call
   * @memberof ArticlesStore
   */
  createArticles(articles) {
    this.articles = articles;
    this.emit('change');
  }

  /**
   * @description Returns value for articles
   * @returns {string} this.articles - articles from the API call
   * @memberof ArticlesStore
   */
  getArticles() {
    return this.articles;
  }

  /**
   * @description Handles Articles actions
   * @returns {void}
   * @param {function} action the dispatched action
   * @memberof ArticlesStore
   */
  handleActions(action) {
    switch (action.type) {
      case 'GET_ARTICLES': {
        this.createArticles(action.articles);
      }
    }
  }
}

const articlesStore = new ArticlesStore();
dispatcher.register(articlesStore.handleActions.bind(articlesStore));
export default articlesStore;
