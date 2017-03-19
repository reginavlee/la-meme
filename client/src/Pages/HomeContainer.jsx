import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/AuthService';
import { Jumbotron, Button, ButtonGroup } from 'react-bootstrap';

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
      <Jumbotron>
      <div>
        <img src="http://i.imgur.com/79ctaQX.png" alt="la même"/>
        <p>A photo captioning game</p>
      </div>
      <ButtonGroup>
        <a href="/login"><Button bsStyle="primary">Login</Button></a>
      </ButtonGroup>
      </Jumbotron>
      </div> 
    );
  }
}

export default Home;

//<a href="/dashboard"><Button bsStyle="primary">Dashboard</Button></a>
