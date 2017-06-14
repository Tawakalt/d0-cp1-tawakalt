import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import News from './News.jsx';
import Login from './Login.jsx';
import AuthStore from '../stores/AuthStore';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {};
  }

  componentWillMount() {
    AuthStore.on('change', this.updateState);
  }

  componentWillUnmount() {
    AuthStore.removeListener('change', this.updateState);
  }

  updateState() {
    this.setState({
      // get auth from store
      auth: AuthStore.getAuth(),
    });
  }

  // declare routes based on the value of auth
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
