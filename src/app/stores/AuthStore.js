import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

/**
 * @description Stores User Authentication Details
 * @class
 * @extends {EventEmitter}
 */
class AuthStore extends EventEmitter {
  /**
   * @description Creates an instance of AuthStore.
   * @memberof AuthStore
   */
  constructor() {
    super();
    this.auth = null;
  }

  /**
   * @description Reassigns auth to idToken
   * @returns {void}
   * @param {string} idToken
   * @memberof AuthStore
   */
  createAuth(idToken) {
    this.auth = idToken;
    this.emit('change');
  }

  /**
   * @description Returns value for auth
   * @returns {string} this.auth
   * @memberof AuthStore
   */
  getAuth() {
    return this.auth;
  }

  /**
   * @description Handles Auth actions
   * @returns {void}
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
