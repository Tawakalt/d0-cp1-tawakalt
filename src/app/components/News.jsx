import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import moment from 'moment';
import renderHTML from 'react-render-html';
import ReactModal from 'react-modal';
import Utils from '../utils';
import UrlStore from '../stores/UrlStore';
import ScrapeStore from '../stores/ScrapeStore';
import * as UrlActions from '../actions/UrlActions';
import * as AuthActions from '../actions/AuthActions';
import * as ScrapeActions from '../actions/ScrapeActions';

const MERCURY_API_KEY = process.env.MERCURY_API_KEY;

/**
 * @export
 * @class News
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
  }

  /** 
   * 
   * @memberof News
   */
  componentWillMount() {
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
   * @function handleOpenModal
   * @memberof News
   */
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  /**
   * @function handleCloseModal
   * @memberof News
   */
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  /**
   * handleCloseModal
   * @memberof News
   */
  updateSearch() {
    // Fire off action createUrl
    let idAndValue = this.query.value.split(',')
    const sourceId = idAndValue[0];
    this.setState({
        sourceSortBy: idAndValue.slice(1),
      });

    UrlActions.createUrl(sourceId, this.sortby.value);
  }

  logout() {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
      // Fire off action getAuth
      AuthActions.getAuth(null);
      location.reload();
    });
  }

  /**
   * @param {any} url 
   * 
   * @memberof News
   */
  updateSearch2(url) {
    // Fire off action createUrl
    this.setState({
      url,
    });
    ScrapeActions.createUrl(url);
  }

  /**
   * 
   * @memberof News
   */
  search() {
    // get url from store
    const url = UrlStore.getUrl();
    Request.get(url).then((response) => {
      this.setState({
        news: response.body.articles,
      });
    });
  }

  /**
   * 
   * @memberof News
   */
  sources() {
    // get url from store
    const url = UrlStore.getSourceUrl();
    Request.get(url).then((response) => {
      this.setState({
        sources: response.body.sources,
        sourceSortBy: ['top'],
      });
    });
  }

  /**
   * @memberof News
   */
  scrape() {
    // get url from store
    const url = ScrapeStore.getUrl();
    Request.get(url)
      .set('X-API-Key', {MERCURY_API_KEY})
      .set('Accept', 'application/json')
      .end((err, response) => {
        const content = response.body.content;
        this.setState({
          content: renderHTML(content),
        });
      });
    this.handleOpenModal();
  }

  render() {
    const news = _.map(this.state.news, (newss) => {
      // create key
      const id = newss.publishedAt + newss.title;
      // Display the result from the API
      return (
        <div className="col-md-4 news-articles" key={id}>
          <img alt="" src={newss.urlToImage} />
          <h3 id="l2">{newss.title}</h3>
          <i>{(moment(new Date(newss.publishedAt))).format('LLLL')}</i>
          <p>{newss.author} : {newss.description}</p>
          <button className="btn btn-danger pull-left">
            <a id="rm" className="" href={newss.url} target="_blank" rel="noopener noreferrer">
              Read From Source
            </a>
          </button>
          <button
            className="btn btn-danger pull-right"
            onClick={() => { this.updateSearch2(newss.url); }}
          >
            Read Here
          </button>
        </div>
      );
    });
    const sources = _.map(this.state.sources, sourcess =>
      // Display the result from the API
       (
         <option key={sourcess.id} value={[sourcess.id, sourcess.sortBysAvailable]}>{sourcess.name}</option>

      ));

      const sortByOptions = _.map(this.state.sourceSortBy, sortBy =>
      // Display the result from the API
       (
         <option key={sortBy} value={sortBy}>{sortBy}</option>

      ));
  
    return (
      <div>
        <div className="container-fluid" id="news">
          <h1>NEWS!!!</h1>
          <div className="pull-right">
            <button
              className="btn btn-block btn-danger btn-md"
              onClick={() => { this.logout(); }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="this.query">Sources</label>
                <select
                  id="selectSources"
                  className="form-control"
                  ref={(c) => { this.query = c; }}
                  onChange={() => { this.updateSearch(); }}
                >
                  {sources}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="this.sortby">Sort By</label>
                <select
                  id="selectSearch"
                  className="form-control"
                  ref={(c) => { this.sortby = c; }}
                  onChange={() => { this.updateSearch(); }}
                >
                 {sortByOptions}
                </select>
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
              <button onClick={this.handleCloseModal}>Close</button>
              {this.state.content}
              <button onClick={this.handleCloseModal}>Close</button>
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}
