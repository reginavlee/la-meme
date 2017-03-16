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
function PrivateRoute({ component: Component, authed, authService, logout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component logout={logout} auth={authService} {...props} />
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
      authed: true,
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }
  componentWillMount() {
    console.log(this.state.auth.loggedIn());
    if (this.state.auth.loggedIn()) {
      this.setState({
        authed: true
      });
    } else {
      this.setState({
        authed: false
      });
    }
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
                  <PrivateRoute logout={this.logout} authService={this.state.auth} authed={this.state.authed} path="/dashboard" component={Dashboard} />
                  <Route path="/play" component={MemeRoomContainer} />
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
