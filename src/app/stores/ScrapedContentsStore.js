import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

/**
 * @description Stores scraped contents from MercuryApi
 * @class
 * @extends {EventEmitter}
 */
class ScrapedContentsStore extends EventEmitter {
  /**
   * @description Creates an instance of ScrapedContentsStore.
   * @memberof ScrapedContentsStore
   */
  constructor() {
    super();
    this.content = null;
  }

  /**
   * @description Reassigns this.articles to the response from NewsApi
   * @returns {void}
   * @param {string} content
   * @memberof ScrapedContentsStore
   */
  createContent(content) {
    this.content = content;
    this.emit('change');
  }

  /**
   * @description Returns value for articles
   * @returns {string} this.articles
   * @memberof ScrapedContentsStore
   */
  getContent() {
    return this.content;
  }

  /**
   * @description Handles ScrapedContents actions
   * @returns {void}
   * @param {function} action
   * @memberof ScrapedContentsStore
   */
  handleActions(action) {
    switch (action.type) {
      case 'GET_CONTENT': {
        this.createContent(action.content);
      }
    }
  }
}

const scrapedContentsStore = new ScrapedContentsStore();
dispatcher.register(scrapedContentsStore.handleActions.bind(scrapedContentsStore));
export default scrapedContentsStore;
