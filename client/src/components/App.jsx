import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

import Home from '../Pages/Home.jsx';
import Navigation from './Navigation.jsx';

class App extends Component {
  render() {
    return (
      <Grid fluid={true}>
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
export default App;