import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            la même
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}

export default Navigation;
