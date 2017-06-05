import { expect } from 'chai';
import AppStore from '../src/app/stores/AppStore2';
import AppDispatcher from '../src/app/dispatchers/dispatcher';

describe('AppActions', function() {
  describe('AppStore', function() {
    
    it('initializes with no auth', function() {
      expect(AppStore.getAuth()).equal(null);
    });

    it('creates auth', function() {

      AppDispatcher.dispatch({
        type: 'GET_AUTH',
        query: 'query'
      });

      expect(AppStore.getAuth()).equal('query');
    });  
  });
});
