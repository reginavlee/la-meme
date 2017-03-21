import Auth0Lock from 'auth0-lock';
import axios from 'axios';

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirect: 'http://localhost:8080/dashboard',
        responseType: 'token'
      }
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult) {
    this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);
      this.setProfile(profile);
      setTimeout(() => {
        this.lock.hide();
      }, 1500);
    });
  }
  login() {
    // Call the show method to display the login widget.
    this.lock.show();
  }
  getProfile(cb) {
  }
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }
  setAccessToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }
  getToken() {
    // Retrieves the user token from local storage
    const token = localStorage.getItem('id_token');
    return token;
  }
  getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }
  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
  }
}
