import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import style from 'react-table/react-table.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <h1> Dashboard Stuff here! </h1>
        <Link to="play">This takes you to chat-room page</Link>
      </div>
    );
  }
}

export default Dashboard;
