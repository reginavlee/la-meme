import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Home from '../Pages/HomeContainer';


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
            <Home />
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
