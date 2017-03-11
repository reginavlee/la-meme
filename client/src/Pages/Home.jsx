import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    console.log(socket);
  }
  createRoom() {
    const room = 'testRoom';
    socket.emit('newRoom', room);
  }
  render() {
    return (
      <div>
        <h1>la même</h1>
        <Link to="dashboard">This takes you to dashboard page</Link>
        <Button bsStyle="primary" onClick={this.createRoom}> Click</Button>
      </div>
    );
  }
}

export default Home;
