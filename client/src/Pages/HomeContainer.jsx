import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/AuthService';

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
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login"> Login</Link>
      </div> 
    );
  }
}

export default Home;
