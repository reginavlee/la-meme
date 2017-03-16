import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Navigation from './Navigation';
import Home from '../Pages/HomeContainer';
import Dashboard from '../Pages/DashboardContainer';
import MemeRoomContainer from '../Pages/MemeRoomContainer';
import Login from '../Pages/Login'

import AuthService from '../../utils/AuthService'

const auth = new AuthService('KhDTuf4lq48s3Db6kEvHHaLGaQCb7ETk', 'lameme.auth0.com');

// validate authentication for private routes
// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname: '/login' })
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Grid fluid>
        <Navigation />
        <Row>
          <Col xs={12} md={8} mdOffset={1}>
            <Router>
              <div>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
                  <Route path="/play" component={MemeRoomContainer} />
                  <Route path="/login" component={Login} />
                  <Route render={() => <h1> Page not found </h1>} />
                </Switch>
              </div>
            </Router>
          </Col>
        </Row>
      </Grid>
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
