import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher';

class AuthStore extends EventEmitter{
  constructor() {
    super ();
    this.auth = null;
  }

  createAuth(query) {
    this.auth = query;
    this.emit('change');
  }

  getAuth() {
    return this.auth;
  }

  handleActions(action) {
    switch(action.type) {
      case 'GET_AUTH':{
        this.createAuth(action.query);
      }
    }
  }
}

const authStore = new AuthStore;
dispatcher.register(authStore.handleActions.bind(authStore));
export default authStore;
