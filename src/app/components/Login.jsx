import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import * as AuthActions from '../actions/AuthActions';
import Utils from '../utils';

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
   * componentDidMount
   * @description Makes an API call to get news source and saves the default rendered news source and it's first sortBy option to the local storage
   * @method
   * @returns {void}
   * @memberof Login
   */
  componentDidMount() {
    Utils.sources().then(response => {
        localStorage.setItem("source", response.body.sources[0].id);
        localStorage.setItem("sortBy", response.body.sources[0].sortBysAvailable[0]);
    });
  }
 
  /** 
   * responseGoogle
   * @description saves id_token to local storage and fires off action to dispatch the id_token to the store
   * @method
   * @memberof Login
   * @returns {void}
   * @param {object} googleUser the signed in google user
   */
  responseGoogle (googleUser) {
    localStorage.setItem("id_token", googleUser.getAuthResponse().id_token);
    const id_token = localStorage.getItem("id_token");
    location.reload();
    AuthActions.getAuth(id_token);
    
  }
 
  /**
   * @description renders SignIn text and button
   * @method
   * @returns {div} sign in text and button
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
