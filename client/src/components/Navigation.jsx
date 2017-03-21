import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    console.log(this.props);
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            {this.props.auth ?
              <Link to="/dashboard">Dashboard</Link>
              :
              <Link to="/login">Login</Link>
            }
          </Navbar.Brand>
        </Navbar.Header>

      </Navbar>
    );
  }
}

export default Navigation;
