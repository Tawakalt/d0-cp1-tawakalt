import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

class ScrapeStore extends EventEmitter {
  constructor() {
    super();
    this.url = '';
  }

  scrapeUrl(url) {
    this.url = `https://mercury.postlight.com/parser?url=${url}`;
    this.emit('change');
  }

  getUrl() {
    return this.url;
  }

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
