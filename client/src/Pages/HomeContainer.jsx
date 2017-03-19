import React, { Component, PropTypes } from 'react';
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
