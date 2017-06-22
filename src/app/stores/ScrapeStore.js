import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

/**
 * @class ScrapeStore
 * @extends {EventEmitter}
 */
class ScrapeStore extends EventEmitter {
  /**
   * Creates an instance of ScrapeStore.
   * @memberof ScrapeStore
   */
  constructor() {
    super();
    this.url = '';
  }

  /**
   * @returns {void} returns nothing
   * @param {string} url
   * @memberof ScrapeStore
   */
  scrapeUrl(url) {
    this.url = `https://mercury.postlight.com/parser?url=${url}`;
    this.emit('change');
  }

  /**
   * @returns {string} this.url
   * @memberof ScrapeStore
   */
  getUrl() {
    return this.url;
  }

  /**
   * @returns {void} returns nothing
   * @param {function} action
   * @memberof ScrapeStore
   */
  handleActions(action) {
    switch (action.type) {
      case 'SCRAPE_URL': {
        this.scrapeUrl(action.url);
      }
    }
  }
}

const scrapeStore = new ScrapeStore();
dispatcher.register(scrapeStore.handleActions.bind(scrapeStore));
export default scrapeStore;
