import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Col, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import genRandomTokenString from '../../utils/genRandomString';
import MemeRoom from '../components/MemeRoom';

class Game extends Component {
  constructor(props) {
    super(props);
    const token = genRandomTokenString();
    this.state = {
      authToken: token,
      username: `Jahosh${token}`,
      currentRoom: '',
      roomCount: 0
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
    const payload = {
      username: this.state.username,
      authToken: this.state.authToken
    };
    this.socket.emit('create-user', payload);
  }
  createRoom() {
    const self = this;
    this.socket.emit('create-room', 'testRoom');
    this.socket.on('join', (roomname) => {
      self.setState({
        currentRoom: roomname
      });
    });
  }
  RoomOccupancy() {
    this.socket.on('occupancy', (newRoomOccupancy) => {
      this.setState({
        roomOccupancy: newRoomOccupancy
      });
    });
    this.socket.on('left-room', (newRoomOccupancy) => {
      this.setState({
        roomOccupancy: newRoomOccupancy
      });
    });
  }
  removeUser() {
    const room = this.state.currentRoom;
    const user = this.state.username;
    const authToken = this.state.authToken;
    const payload = {
      room,
      user,
      authToken
    };
    this.socket.emit('forceDisconnect', payload);
  }
  emitMessage(message) {
    const user = this.state.username;
    const room = this.state.currentRoom;
    const payload = {
      user,
      room,
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
      <MemeRoom
        currentRoom={this.state.currentRoom}
        roomOccupancy={this.state.roomOccupancy}
        handleMessage={this.emitMessage}
      />
    );
  }
}

export default Game;
