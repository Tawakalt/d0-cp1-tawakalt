import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import News from './News.jsx';
import Login from './Login.jsx';
import AuthStore from '../stores/AuthStore';

/** 
 * Header Component
 * @description Declares Routes
 * @export
 * @class
 * @extends {React.Component}
 */
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {};
  }

  /**
   * componentWillMount
   * @description Listens to an onchange event from the AuthStore
   * @method
   * @memberof Header
   * @returns {void}
   */
  componentWillMount() {
    this.setState({
      auth: localStorage.getItem('id_token'),
    });
    AuthStore.on('change', this.updateState);
  }

  /**
   * componentWillUnmount
   * @description removes Listener from the AuthStore
   * @method
   * @memberof Header
   * @returns {void}
   */
  componentWillUnmount() {
    AuthStore.removeListener('change', this.updateState);
  }

  /**
   * updateState
   * @description sets the state for auth
   * @method
   * @memberof Header
   * @returns {void}
   */
  updateState() {
    this.setState({
      auth: localStorage.getItem('id_token'),
    });
  }
  
  /**
   * @description declares the routes
   * @method
   * @returns {div} div
   * @memberof Header
   */
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route
              exact
              path="/"
              render={() => (this.state.auth ? (<Redirect to="/news" />) : (<Login />))}
            />
            <Route
              path="/news"
              render={() => (!this.state.auth ? (<Redirect to="/" />) : (<News />))}
            />
          </div>
        </Router>
      </div>
    );
  }
}
