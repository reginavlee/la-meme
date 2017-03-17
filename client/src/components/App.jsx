import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Navigation from './Navigation';
import Home from '../Pages/HomeContainer';
import Dashboard from '../Pages/DashboardContainer';
import MemeRoomContainer from '../Pages/MemeRoomContainer';
import Login from '../Pages/Login';

import AuthService from '../../utils/AuthService';

// handles our protected routes
function PrivateRoute({ component: Component, authed, authService, userProfile, logout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component logout={logout} profile={userProfile} auth={authService} {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
}

// handles our public routes
function PublicRoute({ component: Component, authed, authService, login, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component login={login} auth={authService} {...props} />
        : <Redirect to="/dashboard" />}
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new AuthService('KhDTuf4lq48s3Db6kEvHHaLGaQCb7ETk', 'lameme.auth0.com'),
      authed: false,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }
  componentWillMount() {
    this.state.auth.lock.on('authenticated', () => {
      this.setState({
        authed: true
      });
      if (this.state.auth.loggedIn()) {
        this.setState({
          authed: true
        });
      }
      // console.log(localStorage.getItem('accessId'));
      // this.state.auth.lock.getUserInfo()
    });
  }
  componentDidMount(){
    // check to see if user is logged in.
    if (this.state.auth.loggedIn()) {
      this.setState({
        authed: true
      });
    }
    // lets grab their credentials from Auth0
    this.state.auth.lock.getUserInfo(localStorage.getItem('accessToken'), (err, profile) => {
      if (err) {
        console.log(err);
      }
      this.setState({
        userProfile: profile
      });
    });
  }
  login() {
    this.setState({
      authed: true
    });
  }
  logout() {
    this.setState({
      authed: false
    });
  }
  render() {
    return (
      <Router>
        <Grid fluid>
          <Navigation />
          <Row>
            <Col xs={12} md={8} mdOffset={1}>
              <div>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <PublicRoute login={this.login} authService={this.state.auth} authed={this.state.authed} path="/login" component={Login} />
                  <PrivateRoute logout={this.logout} userProfile={this.state.userProfile} authService={this.state.auth} authed={this.state.authed} path="/dashboard" component={Dashboard} />
                  <PrivateRoute authed={this.state.authed} path="/play" component={MemeRoomContainer} />
                  <Route render={() => <h1> Page not found </h1>} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Grid>
      </Router>
    );
  }
}

App.PropTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
};

export default App;
