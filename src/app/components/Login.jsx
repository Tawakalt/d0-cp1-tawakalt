import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import * as AuthActions from '../actions/AuthActions';

const CLIENT_ID = process.env.CLIENT_ID;
 
/**
 * Login Component
 * @description Handles Login functionalities
 * @export
 * @class 
 * @extends {React.Component}
 */
export default class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  /** 
   * responseGoogle
   * @description saves id_token to local storage and fires off action to save id_token to store
   * @method
   * @memberof Login
   * @returns {void}
   * @param {object} googleUser
   */
  responseGoogle (googleUser) {
    localStorage.setItem("id_token", googleUser.getAuthResponse().id_token);
    const id_token = localStorage.getItem("id_token");
    AuthActions.getAuth(id_token);
  }
 
  /**
   * @description renders SignIn text and button
   * @method
   * @returns {div} div
   * @memberof Login
   */
  render () {
    return (
      <div className="container-fluid login">
      <div className="row">
        <div className="col-md-4" id='l1'>
          <h1>Sign In with your gmail account and get instant access to news!!!</h1>
          <GoogleLogin socialId={CLIENT_ID}
                    class="google-login"
                    scope="profile"
                    responseHandler={this.responseGoogle}
                    buttonText="Login With Google"/>
        </div>
      </div>
    </div>
    );
  }
}
