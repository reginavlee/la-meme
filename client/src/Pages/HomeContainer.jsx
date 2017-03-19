import React, { Component } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import AuthService from '../../utils/AuthService';
import { Jumbotron, Button, ButtonGroup } from 'react-bootstrap';
=======
import { PageHeader } from 'react-bootstrap';

<<<<<<< HEAD


>>>>>>> touch-up homepage, v1

=======
>>>>>>> fix broken image in home
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
<<<<<<< HEAD
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
=======
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
>>>>>>> touch-up homepage, v1
    );
  }
}

export default Home;

//<a href="/dashboard"><Button bsStyle="primary">Dashboard</Button></a>
