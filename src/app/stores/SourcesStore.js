import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

/**
 * @description Stores Sources from NewsApi
 * @class
 * @extends {EventEmitter}
 */
class SourcesStore extends EventEmitter {
  /**
   * @description Creates an instance of SourcesStore.
   * @memberof SourcesStore
   */
  constructor() {
    super();
    this.sources = null;
    this.sourceSortBy = ['top'];
  }

  /**
   * @description Reassigns this.sources to the sources response from NewsApi
   * @returns {void}
   * @param {string} sources
   * @memberof SourcesStore
   */
  createSources(sources) {
    this.sources = sources;
    this.emit('change');
  }

  /**
   * @description Returns value for sources
   * @returns {string} this.sources
   * @memberof SourcesStore
   */
  getSources() {
    return this.sources;
  }

  /**
   * @description Returns value for sources
   * @returns {string} this.sources
   * @memberof SourcesStore
   */
  getSourceSortBy() {
    return this.sourceSortBy;
  }

  /**
   * @description Handles Sources actions
   * @returns {void}
   * @param {function} action
   * @memberof SourcesStore
   */
  handleActions(action) {
    switch (action.type) {
      case 'GET_SOURCES': {
        this.createSources(action.sources);
      }
    }
  }
}

const sourcesStore = new SourcesStore();
dispatcher.register(sourcesStore.handleActions.bind(sourcesStore));
export default sourcesStore;
