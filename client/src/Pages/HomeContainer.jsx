import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';




class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    Typed.new(".element", {
      strings: ['When you realize the next 3 months of your life are gone <br> because you joined hack reactor'],
      typeSpeed: 0
    });
  }
  render() {
    return (
      <div>
        <div className="text-center">
          <PageHeader>la même</PageHeader>
        </div>
        <div className="text-center">
          <div className="wrapper-showcase text-center">
            <div className="text-center home-meme">
              <img className="text-center" src="https://files.slack.com/files-pri/T2SV1LBC6-F4G53DWKF/screen_shot_2017-03-09_at_7.53.33_am.png" height="600px" />
              <span className="element text-center overlay" />
            </div>
          </div>
        </div>
        <hr />
        <Link to="/login">Login </Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
}

export default Home;
