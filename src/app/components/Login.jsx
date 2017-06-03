import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import AppStore from '../stores/AppStore.jsx';
import * as AppActions from '../actions/AppActions2.jsx';

const LoginButton = React.createClass({

  onSignIn: function(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;  
    AppActions.getAuth(id_token);
  },

  renderGoogleLoginButton: function() {
    console.log('rendering google signin button')
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 220,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': this.onSignIn
    })
  },

  componentDidMount: function() {
    window.addEventListener('google-loaded',this.renderGoogleLoginButton);
  },

  render: function() {
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
});

export default LoginButton;
