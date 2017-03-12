import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Grid, Col, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import genRandomTokenString from '../../utils/genRandomString';
import GameDisplay from '../components/GameDisplay';

class Game extends Component {
  constructor(props) {
    super(props);
    const token = genRandomTokenString();
    this.state = {
      user: {
        authToken: token,
        username: `Jahosh${token}`,
        currentRoom: ''
      }
    };
    this.emitMessage = this.emitMessage.bind(this);
  }
  /**
   * fire off socket connection on component mounting
   */
  componentDidMount() {
    /* initialize client socket connection */
    this.socket = io('http://localhost:3000');
    this.createUser();
    this.createRoom();
    this.renderMessage();
    this.RoomOccupancy();
  }
  /**
   * removes a user from the users storage on unmounting
   */
  componentWillUnmount() {
    this.removeUser();
  }
  /**
   * create a user on the server using Auth0 token
   */
  createUser() {
    this.socket.emit('create-user', this.state.user);
  }
  createRoom() {
    const self = this;
    this.socket.emit('create-room', 'testRoom');
    this.socket.on('join', (roomname) => {
      console.log('joined room');
      self.setState({
        currentRoom: roomname
      });
    });
  }
  RoomOccupancy() {
    this.socket.on('occupacy', (RoomOccupancy) => {
      console.log(RoomOccupancy);
      this.setState({
        roomCount: RoomOccupancy
      });
    });
  }
  removeUser() {
    this.socket.emit('forceDisconnect', this.state.user);
  }
  emitMessage(message) {
    const user = this.state.user.username;
    const payload = {
      user,
      message
    };
    this.socket.emit('chat-message', payload);
  }
  renderMessage() {
    this.socket.on('new-message', (data) => {
      console.log('from renderMessage', data);
      document.getElementById('messages').innerHTML += `<li>${data.message}</li>`;
    });
  }
  render() {
    return (
      <Grid>
        <Row className="game-board-header-content">
          <Col xs={4} xsOffset={5} md={4} mdOffset={5}>
            <h1>la même</h1>
            <p>Counter will go here</p>
            <h2>{ this.state.currentRoom }</h2>
            <h3> currentUsers in Room: <small> {this.state.roomCount} </small> </h3>
            <br />
            <Link to="/">This takes you to home page</Link>
          </Col>
        </Row>
        <Row className="game-board">
          <Col xs={12} md={12}>
            <GameDisplay handleMessage={this.emitMessage} />
          </Col>
        </Row>
        {/* <Button bsStyle="primary" onClick={this.createRoom}> Click</Button> */}
      </Grid>
    );
  }
}

export default Game;
