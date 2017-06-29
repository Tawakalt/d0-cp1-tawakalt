import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import moment from 'moment';
import renderHTML from 'react-render-html';
import ReactModal from 'react-modal';
import Select from 'react-select';
import Utils from '../utils';
import UrlStore from '../stores/UrlStore';
import ScrapeStore from '../stores/ScrapeStore';
import * as UrlActions from '../actions/UrlActions';
import * as AuthActions from '../actions/AuthActions';
import * as ScrapeActions from '../actions/ScrapeActions';

const MERCURY_API_KEY = process.env.MERCURY_API_KEY;

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
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getSort = this.getSort.bind(this);
  }

  /**
   * componentDidMount
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
    ScrapeStore.on('change', () => {
      this.scrape();
    });
    this.sources();
    this.search();
  }

  /**
   * handleOpenModal
   * @description sets the state for showModal
   * @method
   * @memberof News
   * @returns {void}
   */
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  /**
   * handleCloseModal
   * @description sets the state for showModal
   * @method
   * @memberof News
   * @returns {void}
   */
  handleCloseModal() {
    this.setState({ showModal: false });
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
   * @description set states for sourceSortBy and sourceId
   * @method
   * @memberof News
   * @returns {void}
   */
  getSort(event) {
    if (event){
      this.setState({ 
        sourceId :event.id,
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
   * createScrapeUrl
   * @description set state for url and fires of an action 
   * @method
   * @memberof News
   * @param {string} url
   * @returns {void}
   */
  createScrapeUrl(url) {
    // Fire off action createUrl
    this.setState({
      url,
    });
    ScrapeActions.createUrl(url);
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
      this.setState({
        news: response.body.articles,
      });
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
      this.setState({
        sources: response.body.sources,
        sourceSortBy: ['top'],
      });
    })
  }

  /**
   * scrape
   * @description calls an external function, set state for content and calls handleOpenModal function
   * @method
   * @memberof News
   * @returns {void}
   */
  scrape() {
    Utils.scrape().then(response => {
      const content = response.body.content;
        this.setState({
          content: renderHTML(content),
        });
        this.handleOpenModal();
    })
  }

  /**
   * @description renders news articles
   * @method
   * @returns {div} div
   * @memberof News
   */
  render() {
    const news = _.map(this.state.news, (mappedNews) => {
      // create key
      const id = mappedNews.publishedAt + mappedNews.title;
      // Display the result from the API
      return (
        <div className="col-md-4 news-articles" key={id}>
          <img alt="" src={mappedNews.urlToImage} />
          <h3 id="l2">{mappedNews.title}</h3>
          <i>{(moment(new Date(mappedNews.publishedAt))).format('LLLL')}</i>
          <p>{mappedNews.author} : {mappedNews.description}</p>
          <button className="btn btn-info">
            <a id="rm" className="" href={mappedNews.url} target="_blank" rel="noopener noreferrer">
              Read From Source
            </a>
          </button>&nbsp;
          <button
            className="btn btn-info"
            onClick={() => { this.createScrapeUrl(mappedNews.url); }}
          >
            Read Here
          </button>
        </div>
      );
    });
    
      const sortByOptions = _.map(this.state.sourceSortBy, sortBy =>
      // Display the result from the API
       (
         <option key={sortBy} value={sortBy}>{sortBy}</option>

      ));
  
    return (
      <div>
        <nav className="navbar navbar-default navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <p className="navbar-brand" id="news">News!!!</p>
            </div>
           <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <button  className="btn btn-danger navbar-right logout" onClick={() => { Utils.logout(); }}>Logout</button>
          </div>
         </div>
        </nav>
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
            <div className="row">
              {news}
            </div>
          <div>
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
            >
              
             <nav className="navbar navbar-default navbar-inverse navbar-fixed-bottom">
               <div className="container-fluid">
                 <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <p className="navbar-brand" id="news">Close Modal</p>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                  <button  className="btn btn-warning navbar-right" onClick={this.handleCloseModal}>Close</button>
                </div>
              </div>
             </nav>
             {this.state.content}
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}
