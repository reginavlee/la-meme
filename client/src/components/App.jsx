import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Navigation from './Navigation';

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
            { this.props.children }
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
