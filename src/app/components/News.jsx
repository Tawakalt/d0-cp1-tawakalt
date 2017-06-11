import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import moment from 'moment';
import UrlStore from '../stores/UrlStore';
import * as UrlActions from '../actions/UrlActions';
import * as AuthActions from '../actions/AuthActions';


export default class News extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    UrlStore.on('change', () => {
      this.search();
    });
    this.search();
    this.sources();
  }

  updateSearch() {
    // Fire off action createUrl
    UrlActions.createUrl(this.query.value, this.query2.value);
  }

  updateSearch2() {
    // Fire off action createUrl
    UrlActions.createUrl('test');
  }

  logout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      // Fire off action getAuth
      AuthActions.getAuth(null);
    });
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
              <a id="rm" href={newss.url} target="_blank" rel="noopener noreferrer">Read More</a>
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
                  onClick={(event) => { this.logout(); }}
                >
                  Logout
                </button>
              </div>
              <div className="col-md-4 pull-left">
                <label htmlFor="this.query">Sources</label>
                <select
                  className="form-control"
                  ref={(c) => { this.query = c; }}
                  onChange={(event) => { this.updateSearch(); }}
                >
                  {sources}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="this.query2">Sort By</label>
                <select
                  className="form-control"
                  ref={(c) => { this.query2 = c; }}
                  onChange={(event) => { this.updateSearch(); }}
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
        </div>
      </div>
    );
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
}
