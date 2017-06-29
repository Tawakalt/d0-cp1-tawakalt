import React from 'react';
import Utils from '../utils';

/** 
 * Navbar Component
 * @description Creates Navbar for scraping
 * @export
 * @class
 * @extends {React.Component}
 */
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * @description creates navbar
   * @method
   * @returns {nav} nav
   * @memberof Navbar
   */
  render() {
    return (
      <nav className="navbar navbar-default navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <p className="navbar-brand" id="news">Read News From Your Favourite News Source!!!</p>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <button  className="btn btn-danger navbar-right logout" onClick={() => { Utils.logout(); }}>Logout</button>
          </div>
        </div>
      </nav>
    );
  }
}