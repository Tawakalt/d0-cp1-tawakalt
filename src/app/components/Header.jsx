import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import News from './News.jsx';
import Login from './Login.jsx';
import AuthStore from '../stores/AuthStore';

/** 
 * @export
 * @class Header
 * @extends {React.Component}
 */
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {};
  }

  /**
   * @memberof Header
   */
  componentWillMount() {
    AuthStore.on('change', this.updateState);
  }

  /**
   * @memberof Header
   */
  componentWillUnmount() {
    AuthStore.removeListener('change', this.updateState);
  }

  /**
   * updateState: set auth value
   * @memberof Header
   */
  updateState() {
    this.setState({
      // get auth from store
      auth: AuthStore.getAuth(),
    });
  }

  /**
   * @returns DOM elements
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
