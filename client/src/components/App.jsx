import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import io from 'socket.io-client';

/* Components */
import Navigation from './Navigation';
import Home from '../Pages/HomeContainer';
import Dashboard from '../Pages/DashboardContainer';
import MemeRoomContainer from '../Pages/MemeRoomContainer';
import LoginPage from '../Pages/Login';

/* Auth0 Service */
import AuthService from '../../utils/AuthService';

/* Socket.IO Connection */
const socket = io('http://localhost:3000');

// handles our protected routes
function PrivateRoute({ component: Component, authed, authService, userProfile, socket, logout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component socket={socket} logout={logout} profile={userProfile} auth={authService} {...props} />
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
    this.getUsersProfile = this.getUsersProfile.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }
  componentWillMount() {
    // attempt to grab profile from localStorage
    // if it exists, setState, if not hit auth0 api for profile
    // solves refresh issue~
    const profile = JSON.parse(localStorage.getItem('profile'));
    if (profile) {
      this.setState({
        authed: true,
        profile
      });
    } else {
      this.getUsersProfile();
    }
  }
  componentDidMount() {
    this.getUsersProfile();

  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState);
  }
  componentDidUpdate() {
    if (this.state.userProfile) {
      this.setState({
        authed: true
      });
    }
  }
  getUsersProfile() {
    this.state.auth.lock.on('authenticated', (authResult) => {
      this.state.auth.lock.getUserInfo(authResult.accessToken, (err, profile) => {
        if (err) {
          console.log(err);
        }
        console.log(profile);
        this.setState({
          authed: true,
          profile
        });
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
      authed: false,
      profile: null
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
                { this.state.authed ? <h1 className="loginMsg">Logged in as: {this.state.profile.username} </h1> : 'please login: ' }
                <Switch>
                  {/*<LoginPage login={this.login} />*/}
                  <Route exact path="/" component={Home} />
                  <PublicRoute login={this.login} authService={this.state.auth} authed={this.state.authed} path="/login" component={LoginPage} />
                  <PrivateRoute socket={socket} logout={this.logout} userProfile={this.state.profile} authService={this.state.auth} authed={this.state.authed} path="/dashboard" component={Dashboard} />
                  <PrivateRoute socket={socket} authed={this.state.authed} userProfile={this.state.profile} path="/play" component={MemeRoomContainer} />
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
