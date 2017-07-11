import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

/**
 * @description Stores Scraping-Related Details
 * @class
 * @extends {EventEmitter}
 */
class ScrapeStore extends EventEmitter {
  /**
   * @description Creates an instance of ScrapeStore.
   * @memberof ScrapeStore
   */
  constructor() {
    super();
    this.url = '';
  }

  /**
   * @description Reassigns url to that of mercury
   * @returns {void}
   * @param {string} url url of the article desired for scraping
   * @memberof ScrapeStore
   */
  scrapeUrl(url) {
    this.url = `https://mercury.postlight.com/parser?url=${url}`;
    this.emit('change');
  }

  /**
   * @description Returns the url
   * @returns {string} this.url url to be used for the API call
   * @memberof ScrapeStore
   */
  getUrl() {
    return this.url;
  }

  /**
   * @description Handles Scrape actions
   * @returns {void}
   * @param {function} action the dispatched action
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
