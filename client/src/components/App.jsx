import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Navigation from './Navigation';
import Home from '../Pages/Home';
import Dashboard from '../Pages/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} md={8} mdOffset={1}>
            {/*<Navigation />*/}
            <Home />
            {/*<Dashboard />*/}
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
