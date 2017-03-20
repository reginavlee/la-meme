import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/AuthService';
import { Jumbotron, Button, ButtonGroup, PageHeader } from 'react-bootstrap';

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
          <img src="http://i.imgur.com/79ctaQX.png" alt="la même"/>
        </div>
        <div className="text-center">
          <div className="wrapper-showcase text-center">
            <div className="text-center home-meme">
              <img className="text-center homePhoto" src="https://s3-us-west-2.amazonaws.com/lameme/joshmeme.png" />
              <span className="element text-center overlay" />
            </div>
          </div>
        </div>
        <hr />
        <a href="/login"><Button bsStyle="primary">Login</Button></a>
      </div>
    );
  }
}

export default Home;

//<a href="/dashboard"><Button bsStyle="primary">Dashboard</Button></a>
