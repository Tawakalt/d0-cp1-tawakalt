import React from 'react';
import _ from 'lodash';
import ReactModal from 'react-modal';
import renderHTML from 'react-render-html';
import Utils from '../utils';
import ScrapeNavbar from './ScrapeNavbar.jsx';
import ScrapeStore from '../stores/ScrapeStore';
import ArticlesStore from '../stores/ArticlesStore';
import ScrapedContentsStore from '../stores/ScrapedContentsStore';
import * as ScrapeActions from '../actions/ScrapeActions';
import * as ScrapedContentAction from '../actions/ScrapedContentAction';

/** 
 * MapNews Component
 * @description Maps and Renders News Articles
 * @export
 * @class
 * @extends {React.Component}
 */
export default class MapNews extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.scrape = this.scrape.bind(this);
  }

  /**
   * componentDidMount
   * @description Listens to an onchange event from the ScrapeStore and the ScrapedContentsStore
   * @method
   * @memberof MapNews
   * @returns {void}
   */
  componentDidMount() {
    ScrapeStore.on('change', this.scrape);
    ScrapedContentsStore.on('change', this.updateContent);
  }

  /**
   * componentWillMount
   * @description removes Listener from ScrapedContentsStore and ScrapeStore
   * @method
   * @memberof MapNews
   * @returns {void}
   */
  componentWillUnmount() {
    ScrapedContentsStore.removeListener('change', this.updateContent);
    ScrapeStore.removeListener('change', this.scrape);
  }

  /**
   * handleOpenModal
   * @description sets the state for showModal
   * @method
   * @memberof MapNews
   * @returns {void}
   */
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  /**
   * handleCloseModal
   * @description sets the state for showModal
   * @method
   * @memberof MapNews
   * @returns {void}
   */
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  /**
   * createScrapeUrl
   * @description set state for url and fires of an action to dispatch it to the store
   * @method
   * @memberof MapNews
   * @param {string} url url of the news article desired for scraping
   * @returns {void}
   */
  createScrapeUrl(url) {
    this.setState({
      url,
    });
    ScrapeActions.createUrl(url);
  }

  /**
   * scrape
   * @description calls an external function that makes the mercuryApi call, dispatches the response to the store and calls handleOpenModal function
   * @method
   * @memberof MapNews
   * @returns {void}
   */
  scrape() {
    Utils.scrape().then((response => {
      let content
      if (response.body.content === "<body> </body>"){
        content = "<body> <h1>Can't successfully scrape this site</h1></body>";
      }
      else{
       content = response.body.content; 
      } 
        content = renderHTML(content);
        ScrapedContentAction.setScrapedContent(content);
        this.handleOpenModal();
    }), 
    (error => {
      this.setState({
          error: renderHTML(error),
        });
    }))
  }

  /**
   * updateContent
   * @description gets scraped content from the store and sets a state for it
   * @method
   * @memberof MapNews
   * @returns {void}
   */
  updateContent() {
    this.setState({
      content: ScrapedContentsStore.getContent(),
    });
  }

  /**
   * @description maps and renders news articles
   * @method
   * @returns {div} news elements
   * @memberof MapNews
   */
  render() {
    const articles = ArticlesStore.getArticles();
    const news = _.map(articles, (mappedNews) => {
      const id = mappedNews.publishedAt + mappedNews.title;
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
            className="btn btn-info readHere"
            onClick={() => { this.createScrapeUrl(mappedNews.url); }}
          >
            Read Here
          </button>
        </div>
      );
    });
    return (
      <div>
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
              <ScrapeNavbar />
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                <button  className="btn btn-warning navbar-right" onClick={this.handleCloseModal}>Close</button>
              </div>
              </div>
            </nav> 
            {this.state.content}
          </ReactModal>
        </div>
      </div>
    );
  }
}