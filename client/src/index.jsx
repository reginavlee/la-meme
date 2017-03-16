import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import Login from './pages/Login';
import AuthService from '../utils/AuthService';
import IndexRediret from 'react-router';

const auth = new AuthService('KhDTuf4lq48s3Db6kEvHHaLGaQCb7ETk', 'lameme.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const Authenticate = () => {
  if (!auth.loggedIn()) {
    auth.login();
  }
}

ReactDOM.render(
  <App />
  , document.getElementById('app'));
