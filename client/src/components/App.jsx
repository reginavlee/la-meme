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
import Login from '../Pages/Login'

import AuthService from '../../utils/AuthService'

const auth = new AuthService('KhDTuf4lq48s3Db6kEvHHaLGaQCb7ETk', 'lameme.auth0.com');

<<<<<<< HEAD

=======
// handles our protected routes
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
}

// handles our public routes
function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to="/dashboard" />}
    />
  );
}

>>>>>>> setup auth

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
    };
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
<<<<<<< HEAD
                  <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
=======
                  <PrivateRoute authed={this.state.authed} path="/dashboard" component={Dashboard} />
>>>>>>> setup auth
                  <Route path="/play" component={MemeRoomContainer} />
                  <PublicRoute authed={this.state.authed} path="/login" component={Login} />
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
