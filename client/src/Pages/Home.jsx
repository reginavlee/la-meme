import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

class Home extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1> la même </h1>

        <Link to='dashboard'>This takes you to dashboard page</Link>
      </div>
    );
  }
}

export default Home;