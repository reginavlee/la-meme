import React, { Component } from 'react';
import { Link } from 'react-router';

class Dashboard extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1> Dashboard Stuff here! </h1>
        <Link to='play'>This takes you to chat-room page</Link>
      </div>
    );
  }
}

export default Dashboard;