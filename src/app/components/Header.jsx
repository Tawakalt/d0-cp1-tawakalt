import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import News from './News.jsx';
import Login from './Login.jsx';
import AppStore2 from '../stores/AppStore2';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.state = {};
  }

  componentWillMount() {
    AppStore2.on('change', this.updateState);
  }

  componentWillUnmount() {
    AppStore2.removeListener('change', this.updateState);
  }

  updateState() {
    this.setState({
      // get auth from store
      auth: AppStore2.getAuth(),
    });
    console,log(this.state.auth);
  }

  //declare routes based on the value of auth
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" render={() => (this.state.auth ? (<Redirect to="/news" />) : (<Login />))} />
            <Route path="/news" render={() => (!this.state.auth ? (<Redirect to="/" />) : (<News />))} />
          </div>
        </Router>
      </div>
    );
  }
}
