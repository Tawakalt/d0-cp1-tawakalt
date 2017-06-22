import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

/**
 * @class ScrapeStore
 * @extends {EventEmitter}
 */
class ScrapeStore extends EventEmitter {
  constructor() {
    super();
    this.url = '';
  }

  /**
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
