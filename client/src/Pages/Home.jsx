import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <h1>la même</h1>
        <Link to="dashboard">This takes you to dashboard page</Link>
      </div>
    );
  }
}

export default Home;
