import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import * as AuthActions from '../actions/AuthActions';

export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.onSignIn = this.onSignIn.bind(this);
    this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
  }

  onSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    AuthActions.getAuth(idToken);
  }

  renderGoogleLoginButton() {
    // console.log('rendering google signin button')
    gapi.signin2.render('my-signin2', {
      scope: 'https://www.googleapis.com/auth/plus.login',
      onsuccess: this.onSignIn,
    });
  }

  render() {
    // let displayText = "Sign in with Google";
    return (
      <div>
        <div className="container" id="l1">
          <h1>Sign In with your gmail account and get instant access to news!!!</h1>
        </div>
        <div id="my-signin2">
          <GoogleLogin
            socialId="988973865780-3v66qmptthhkfm9hh242hg5kkehek0kt.apps.googleusercontent.com"
            class="google-login"
            scope="profile"
            responseHandler={this.onSignIn}
            buttonText="Login With Google"
          />
        </div>
      </div>
    );
  }
}
