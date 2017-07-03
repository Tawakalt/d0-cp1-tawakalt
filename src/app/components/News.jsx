import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import moment from 'moment';
import Select from 'react-select';
import Navbar from './Navbar.jsx';
import MapNews from './MapNews.jsx';
import Utils from '../utils';
import UrlStore from '../stores/UrlStore';
import * as UrlActions from '../actions/UrlActions';
import * as AuthActions from '../actions/AuthActions';

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
      sourceId:'abc-news-au',
    };
    this.getSort = this.getSort.bind(this);
  }

  /**
   * componentWillMount
   * @description Listens to an onchange event from stores
   * @method
   * @memberof news
   * @returns {void}
   */
  componentWillMount() {
    UrlStore.on('change', () => {
      this.setState({
        content: '',
      });
      this.search();
    });
    this.sources();
    this.search();
  }

  /**
   * createUrl
   * @description fires off an action
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
   * @description calls an external function and set state for news
   * @method
   * @memberof News
   * @returns {void}
   */
  search() {
    Utils.search().then(response => {
      if (response.body){
        this.setState({
          news: response.body.articles,
        });
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
   * @description calls an external function and set state for sources and sourceSortBy
   * @method
   * @memberof News
   * @returns {void}
   */
  sources() {
    Utils.sources().then(response => {
      if(response.body){
        this.setState({
        sources: response.body.sources,
        sourceSortBy: ['top'],
      });
    }
    else {
      this.setState({
          error: 'Internet Error....',
        });
    }   
    });
  }

  /**
   * @description renders news articles
   * @method
   * @returns {div} div
   * @memberof News
   */
  render() {    
      const sortByOptions = _.map(this.state.sourceSortBy, sortBy =>
       (
         <option key={sortBy} value={sortBy}>{sortBy}</option>

      ));
      if (this.state.news){
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
              <MapNews news={this.state.news} />
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
