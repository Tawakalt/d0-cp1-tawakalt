import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import * as AuthActions from '../actions/AuthActions';

/**
 * Login Component
 * @description Handles Login functionalities
 * @export
 * @class 
 * @extends {React.Component}
 */
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSignIn = this.onSignIn.bind(this);
    this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
  }

  /** 
   * onSignIn
   * @description fires off action to save user after login
   * @method
   * @memberof Login
   * @returns {void}
   * @param {object} googleUser
   */
  onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    AuthActions.getAuth(id_token);
  }

  /**
   * renderGoogleLoginButton
   * @description  creates the google login button
   * @method
   * @memberof Login
   * @returns {void}
   */
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

  /**
   * componentDidMount
   * @description Listens to an event 
   * @method
   * @memberof Login
   * @returns {void}
   */
  componentDidMount() {
    window.addEventListener('google-loaded',this.renderGoogleLoginButton);
  }

  /**
   * @description renders SignIn text and button
   * @method
   * @returns {div} div
   * @memberof Login
   */
  render() {
    let displayText = "Sign in with Google";
    return (
      <div className="container-fluid login">
        <div className="row">
          <div className="col-md-4" id='l1'>
           <h1>Sign In with your gmail account and get instant access to news!!!</h1>
           <div id="my-signin2"></div>
         </div>
      </div>
    </div>
    );
  }
}