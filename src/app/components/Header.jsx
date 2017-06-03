import React from 'react';
import { BrowserRouter as Router, Route, Link,Switch, Redirect } from 'react-router-dom';
import Request from 'superagent';
import _ from 'lodash';
import News from './News.jsx';
import Login from './Login.jsx';
import AppStore2 from '../stores/AppStore2.jsx';

export default class Header extends React.Component{
  constructor(props) {
    super (props);
    this.updateState = this.updateState.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      };
  }

  componentWillMount() {
      AppStore2.on('change', this.updateState);
  }

  componentWillUnmount() {
    AppStore2.removeListener('change', this.updateState);
  }

  updateState(){
    this.setState({
      auth: AppStore2.getAuth()
    });
  }

  render () {

    return (
      <div> 
      <Router>
        <div>
          <Route exact path='/' render={() => (this.state.auth ? (<Redirect to='/news' />) : (<Login />) )} />
          <Route path='/news' render={() => (!this.state.auth ? (<Redirect to='/' />) : (<News />) )} />
        </div>
      </Router>
    </div>
    );
  }

}
