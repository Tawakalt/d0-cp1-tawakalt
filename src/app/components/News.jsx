import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import moment from 'moment';
import renderHTML from 'react-render-html';
import ReactModal from 'react-modal';
import UrlStore from '../stores/UrlStore';
import ScrapeStore from '../stores/ScrapeStore';
import * as UrlActions from '../actions/UrlActions';
import * as AuthActions from '../actions/AuthActions';
import * as ScrapeActions from '../actions/ScrapeActions';

const API_KEY = 'ooyHUD7ccczgN4x8J37dG3VtpLhzsLMS2BWutEVf';

export default class News extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillMount() {
    UrlStore.on('change', () => {
      this.setState({
        content: '',
      });
      this.search();
    });
    ScrapeStore.on('change', () => {
      // location.reload();
      this.scrape();
    });
    this.search();
    this.sources();
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  updateSearch() {
    // Fire off action createUrl
    UrlActions.createUrl(this.query.value, this.query2.value);
  }

  updateSearch2(url) {
    // Fire off action createUrl
    this.setState({
      url,
    });
    ScrapeActions.createUrl(url);
  }

  logout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      // Fire off action getAuth
      AuthActions.getAuth(null);
      location.reload();
    });
  }

  search() {
    // get url from store
    const url = UrlStore.getUrl();
    Request.get(url).then((response) => {
      this.setState({
        news: response.body.articles,
      });
    });
  }

  sources() {
    // get url from store
    const url = UrlStore.getSourceUrl();
    Request.get(url).then((response) => {
      this.setState({
        sources: response.body.sources,
      });
    });
  }

  scrape() {
    // get url from store
    const url = ScrapeStore.getUrl();
    Request.get(url)
      .set('X-API-Key', API_KEY)
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
        <div className="container" key={id}>
          <h3 id="l2">{newss.title}</h3>
          <img alt="" src={newss.urlToImage} />
          <p>
            <i>{(moment(new Date(newss.publishedAt))).format('LLLL')}</i>
          </p>
          <p>{newss.author} : {newss.description}</p>
          <p>
            <button className="btn btn-danger">
              <a id="rm" href={newss.url} target="_blank" rel="noopener noreferrer">
                Read From Source
              </a>
            </button>
          </p>
          <p>
            <button
              className="btn btn-danger"
              onClick={() => { this.updateSearch2(newss.url); }}
            >
             Read Here
            </button>
          </p>
          <hr />
        </div>
      );
    });
    const sources = _.map(this.state.sources, sourcess =>
      // Display the result from the API
       (
         <option key={sourcess.id} value={sourcess.id}>{sourcess.name}</option>

      ));
    return (
      <div>
        <div className="container-fluid" id="news">
          <h1>NEWS!!!</h1>
        </div>
        <div className="container">
          <div className="form-group">
            <div className="row">
              <div className="col-md-4 pull-right">
                <br />
                <button
                  className="btn btn-block btn-danger btn-lg btn-huge"
                  onClick={() => { this.logout(); }}
                >
                  Logout
                </button>
              </div>
              <div className="col-md-4 pull-left">
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
              <div className="col-md-4">
                <label htmlFor="this.query2">Sort By</label>
                <select
                  id="selectSearch"
                  className="form-control"
                  ref={(c) => { this.query2 = c; }}
                  onChange={() => { this.updateSearch(); }}
                >
                  <option value="top">Top</option>
                  <option value="latest">Latest</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <ul>{news}</ul>
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
