import React from 'react';

/** 
 * Header Component
 * @description Declares Routes
 * @export
 * @class
 * @extends {React.Component}
 */
export default class ScrapeNavbar extends React.Component {
  constructor() {
    super();
  }

  /**
   * @description declares the routes
   * @method
   * @returns {div} div
   * @memberof Header
   */
  render() {
    return (
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <p className="navbar-brand" id="news">Close Modal</p>
      </div>
    );
  }
}