import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    // imported in index.html, Typed is a global var
    Typed.new('.element', {
      strings: ['When you realize the next 3 months of your life are gone <br> ^500 because you joined hack reactor', 'When youre still working on the TA <br> ^500 but Brandon and Andrew left 7 hours ago', 'dat ^1000 booty'],
      typeSpeed: 0,
      backSpeed: -25,
      showCursor: false,
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs={4} md={4} mdOffset={3} xsOffset={2}>
            <div className="text-center">
              <img src="http://i.imgur.com/79ctaQX.png" alt="la même" />
            </div>
            <hr />
            <div className="wrapper-showcase text-center">
              <div className=" home-meme">
                <img className="homePhoto text-center" alt="meme" src="https://s3-us-west-2.amazonaws.com/lameme/joshmeme.png" />
                <span className="element text-center overlay" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;

