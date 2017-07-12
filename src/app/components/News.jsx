import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import moment from 'moment';
import Select from 'react-select';
import Navbar from './Navbar.jsx';
import MapNews from './MapNews.jsx';
import Utils from '../utils';
import UrlStore from '../stores/UrlStore';
import ArticlesStore from '../stores/ArticlesStore';
import SourcesStore from '../stores/SourcesStore';
import * as UrlActions from '../actions/UrlActions';
import * as AuthActions from '../actions/AuthActions';
import * as ArticlesActions from '../actions/ArticlesActions';
import * as SourcesActions from '../actions/SourcesActions';

/**
 * News Component
 * @description Handles News Functionalities
 * @export
 * @class
 * @extends {React.Component}
 */
export default class News extends React.Component {
  constructor() {
    super();
    this.state = {
      sourceId:localStorage.getItem("source"),
    };
    this.getSort = this.getSort.bind(this);
    this.updateArticles = this.updateArticles.bind(this);
    this.updateSources = this.updateSources.bind(this);
    this.search = this.search.bind(this);
  }

  /**
   * componentWillMount
   * @description Listens to an onchange event from stores
   * @method
   * @memberof news
   * @returns {void}
   */
  componentDidMount() {
    UrlStore.on('change', () => {
      this.setState({
        content: '',
      });
      this.search();
    });
    ArticlesStore.on('change', this.updateArticles);
    SourcesStore.on('change', this.updateSources);
    this.sources();
    this.search();
  }

  /**
   * componentWillMount
   * @description removes Listener from stores
   * @method
   * @memberof News
   * @returns {void}
   */
  componentWillUnmount() {
    ArticlesStore.removeListener('change', this.updateArticles);
    SourcesStore.removeListener('change', this.updateSources);
    UrlStore.removeListener('change', this.search);
  }

  /**
   * createUrl
   * @description fires off an action to dispatch the selected news source and sortBy option to the store
   * @method
   * @memberof News
   * @returns {void}
   */
  createUrl() {
    UrlActions.createUrl(this.state.sourceId, this.sortby.value);
  }

  /**
   * getSort
   * @description set states for sourceId, sourceSortBy and sourceId
   * @method
   * @memberof News
   * @returns {void}
   */
  getSort(event) {
    if (event){
      this.setState({ 
        sourceId: event.id,
        sourceSortBy: event.sortBysAvailable, 
        sourceValue: event,
      });
    }
    else{
      this.setState({ 
        sourceValue: event,
      });
    }
  }

  /**
   * search
   * @description calls an external function that makes a search call to the API and dispatches the response to the store
   * @method
   * @memberof News
   * @returns {void}
   */
  search() {
    Utils.search().then(response => {
      if (response.body){
        ArticlesActions.setArticles(response.body.articles);
      }
      else{
        this.setState({
          error: 'Internet Error....',
        });
      } 
    });
  }

  /**
   * sources
   * @description calls an external function that makes an API call and dispatches the response to the store
   * @method
   * @memberof News
   * @returns {void}
   */
  sources() {
    Utils.sources().then(response => {
      if(response.body){
        SourcesActions.setSources(response.body.sources);
        localStorage.setItem("source", response.body.sources[0].id);
        localStorage.setItem("sortBy", response.body.sources[0].sortBysAvailable[0]);
    }
    else {
      this.setState({
          error: 'Internet Error....',
        });
    }   
    });
  }

  /**
   * updateArticles
   * @description gets news articles from the store and sets a state for them
   * @method
   * @memberof News
   * @returns {void}
   */
  updateArticles() {
    this.setState({
      articles: ArticlesStore.getArticles(),
    });
  }

  /**
   * updateSources
   * @description gets news sources and sortby options from the store and sets states for them
   * @method
   * @memberof News
   * @returns {void}
   */
  updateSources() {
    this.setState({
      sources: SourcesStore.getSources(),
      sourceSortBy: SourcesStore.getSourceSortBy(),
    });
  }

  /**
   * @description renders news articles
   * @method
   * @returns {div} news element
   * @memberof News
   */
  render() {   
      const sortByOptions = _.map(this.state.sourceSortBy, sortBy =>
       (
         <option key={sortBy} value={sortBy}>{sortBy}</option>

      ));
      
      if (this.state.articles){
        return (
          <div>
            <Navbar />
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="this.query">Sources</label>
                  <Select
                    name="selectSources"
                    onChange={ this.getSort}
                    labelKey="name"
                    value={this.state.sourceValue}
                    options={this.state.sources}
                    searchable
                    tabSelectsValue
                    placeholder="Select News Source"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="this.sortby">Sort By</label>
                  <select
                    id="selectSearch"
                    className="form-control"
                    ref={(c) => { this.sortby = c; }}
                  >
                    {sortByOptions}
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor=""></label>
                  <button
                    className="btn btn-block btn-info btn-md createUrl"
                    onClick={() => { this.createUrl(); }}
                  >
                  Get News
                  </button>
                </div>
                <div className="col-md-3">
                </div>
              </div>
              <MapNews />
            </div>
          </div>
        );
      }
      else{
        return(
          <div>
            <h1>{this.state.error}</h1>
          </div>
        );
      } 
  }
}
