import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import * as AuthActions from '../actions/AuthActions';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSignIn = this.onSignIn.bind(this);
    this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
  }

  onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;  
    AuthActions.getAuth(id_token);
  }

  renderGoogleLoginButton() {
    //console.log('rendering google signin button')
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 220,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': this.onSignIn
    })
  }

  componentDidMount() {
    window.addEventListener('google-loaded',this.renderGoogleLoginButton);
  }

  render() {
    let displayText = "Sign in with Google";
    return (
    <div>
      <div className="container" id='l1'>
        <h1>Sign In with your gmail account and get instant access to news!!!</h1>
      </div>
      <div className="row">
       <div id="my-signin2"></div>
      </div>
    </div>
    );
  }
}