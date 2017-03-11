import React, { Component } from 'react';
import { Link } from 'react-router';
import io from 'socket.io-client';
import { Button } from 'react-bootstrap';

const socket = io('http://localhost:3000');

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  createRoom() {
    const user = {
      name: 'Jahosh',
      _id: '1',
    };
    socket.emit('chat-message', user);
  }
  render() {
    return (
      <div>
        <h1>Game Stuff here!</h1>
        <Link to="/">This takes you to home page</Link>
        <Button bsStyle="primary" onClick={this.createRoom}> Click</Button>
      </div>
    );
  }
}

export default Game;
