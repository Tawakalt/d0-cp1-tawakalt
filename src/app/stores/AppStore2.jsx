import EventEmitter from 'events';
import dispatcher from '../dispatchers/dispatcher.jsx';

class AppStore2 extends EventEmitter{
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

const appStore2 = new AppStore2;
dispatcher.register(appStore2.handleActions.bind(appStore2));
export default appStore2;
