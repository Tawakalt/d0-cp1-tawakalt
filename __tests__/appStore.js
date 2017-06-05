import { expect } from 'chai';
import AppStore from '../src/app/stores/AppStore';
import AppDispatcher from '../src/app/dispatchers/dispatcher';

describe('AppActions', () => {
  describe('AppStore', () => {
    
    it('initializes with no auth', () => {
      expect(AppStore.getUrl()).equal('https://newsapi.org/v1/articles?source=al-jazeera-english&sortBy=top&apiKey=213327409d384371851777e7c7f78dfe');
    });

    it('creates url', () => {

      AppDispatcher.dispatch({
        type: 'CREATE_URL',
        query: 'mirror',
        query2: 'top',
       });
            
      expect(AppStore.getUrl()).equal('https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=213327409d384371851777e7c7f78dfe');
    });
  });
});
