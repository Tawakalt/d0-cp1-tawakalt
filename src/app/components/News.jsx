import React from 'react';
import Request from 'superagent';
import _ from 'lodash';
import AppStore from '../stores/AppStore.jsx';
import * as AppActions from '../actions/AppActions.jsx';
import * as AppActions2 from '../actions/AppActions2.jsx';
import moment from 'moment';

export default class News extends React.Component{
  constructor() {
    super ();
    this.state = {};
  }

  componentWillMount() {
    AppStore.on('change', () => {
      this.search();
    });
    this.search();
  }

  updateSearch(){
    AppActions.createUrl(this.refs.query.value,this.refs.query2.value)
  }

  logout(){
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      AppActions2.getAuth(null);
    });    
  }

  render(){
    const news = _.map(this.state.news, (newss) => {
      const id = newss.publishedAt + newss.title;
      return (
       <div className="container" key={id}>
          <h3 id='l2'>{newss.title}</h3>
          <img src={newss.urlToImage}/>
          <p><i>{(moment(new Date(newss.publishedAt))).format('LLLL')}</i></p>
          <p>{newss.author} : {newss.description}</p>
          <p><button className="btn btn-danger"><a id='rm' href={newss.url} target='_blank'>Read More</a></button></p>          
          <hr/>
       </div>
      );
    });
    return (
      <div>
        <div className="container-fluid" id='news'>
          <h1>NEWS!!!</h1>         
        </div>
        <div className="container">
          <div className="form-group">
            <div className='row'>
              <div className="col-md-4 pull-right">
                 <br/>   
                <button className="btn btn-block btn-danger btn-lg btn-huge" onClick={(event) => { this.logout(); } }>Logout</button>
              </div>
              <div className="col-md-4 pull-left">
                <label>Sources</label>
                <select className="form-control" ref='query' onChange={(event) => { this.updateSearch(); } }>
                  <option value="al-jazeera-english">Al Jazeera English</option>
                  <option value="ars-technica">Ars Technica</option>
                  <option value="bild">Bild</option>
                  <option value="breitbart-news">Breibart News</option>
                  <option value="time">Time</option>
                  <option value="fortune">Fortune</option>
                  <option value="techcrunch">Techcrunch</option>
                  <option value="mirror">Mirror</option>
                </select>
              </div>
              <div className="col-md-4">
                <label>Sort By</label>
                <select className="form-control" ref='query2' onChange={(event) => { this.updateSearch(); } }>
                  <option value="top">Top</option>
                  <option value="latest">Latest</option>
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <ul>{news}</ul>
          </div>
        </div>
      </div>
    );
  }

  search(query, query2) {
    var url = AppStore.getUrl(); 
    Request.get(url).then((response) => {
      this.setState({
        news: response.body.articles,
      });
    });
  }
}
