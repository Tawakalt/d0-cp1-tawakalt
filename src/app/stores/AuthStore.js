import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

/**
 * @class AuthStore
 * @extends {EventEmitter}
 */
class AuthStore extends EventEmitter {
  /**
   * Creates an instance of AuthStore.
   * @memberof AuthStore
   */
  constructor() {
    super();
    this.auth = null;
  }

  /**
   * @returns {void} returns nothing
   * @param {any} idToken
   * @memberof AuthStore
   */
  createAuth(idToken) {
    this.auth = idToken;
    this.emit('change');
  }

  /**
   * @returns {string} this.auth
   * @memberof AuthStore
   */
  getAuth() {
    return this.auth;
  }

  /**
   * @returns {void} returns nothing
   * @param {function} action
   * @memberof AuthStore
   */
  handleActions(action) {
    switch (action.type) {
      case 'GET_AUTH': {
        this.createAuth(action.idToken);
      }
    }
  }
}

const authStore = new AuthStore();
dispatcher.register(authStore.handleActions.bind(authStore));
export default authStore;
