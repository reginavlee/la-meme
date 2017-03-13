import React, { Component } from 'react';
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
      playerCount: 0,
      spectatorCount: 0,
      timer: 0,
      round: 0
    };
    this.emitMessage = this.emitMessage.bind(this);
  }
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.createUser();
    this.createRoom();
    this.renderMessage();
    this.RoomOccupancy();
    window.onbeforeunload = () => {
      this.removeUser();
    };
    // this.listenforCountdown();
  }
  /**
   * fire off socket connection on component mounting
   */
  componentDidMount() {
    /* initialize client socket connection */
    // this.socket = io('http://localhost:3000');
    // this.createUser();
    // this.createRoom();
    // this.renderMessage();
    // this.RoomOccupancy();
    // this.triggerCountDown();
    this.listenforCountdown();
    this.listenForPlayerStatus();
    this.roundOver();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.countingDown && this.state.playerCount === 2 && this.state.round < 1) {
      this.triggerCountDown();
    }
  }
  /**
   * removes a user from the users storage on unmounting
   */
  componentWillUnmount() {
    this.removeUser();
    window.onbeforeunload = null;
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
  removeUser() {
    const room = this.state.currentRoom;
    const user = this.state.username;
    const connectionType = this.state.connectionType;
    const authToken = this.state.authToken;
    const payload = {
      room,
      connectionType,
      user,
      authToken
    };
    this.socket.emit('forceDisconnect', payload);
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
  triggerCountDown() {
    console.log('trigger fired', this.state);
    // state is static if called from component did componentDidMount
    // this should be called from componentDid Update or something ..
    if (!this.state.countingDown && this.state.playerCount === 2 && this.state.connectionType !== 'spectator') {
      this.socket.emit('start-round', 'testRoom');
    }
  }
  listenForPlayerStatus() {
    this.socket.on('status', (connectionType) => {
      this.setState({
        connectionType
      });
    });
  }
  listenforCountdown() {
    const self = this;
    this.socket.on('count-down', ({ time, countingDown }) => {
      self.setState({
        timer: time,
        countingDown
      });
    });
  }
  roundOver() {
    const self = this;
    this.socket.on('round-over', (round) => {
      console.log(`round ${round} is over!`);
      const count = round + 1;
      document.getElementById('display-meme').removeAttribute('class');
      if (round === 3) {
        document.getElementById('display-meme').className = 'meme-display';
      }
      self.setState({
        countingDown: false,
        round: count
      });
    });
  }
  RoomOccupancy() {
    this.socket.on('occupancy', ({ playerCount, spectatorCount }) => {
      this.setState({
        playerCount,
        spectatorCount
      });
    });
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
        roomOccupancy={this.state.playerCount}
        handleMessage={this.emitMessage}
        currentTime={this.state.timer}
        spectators={this.state.spectatorCount}
        connectionType={this.state.connectionType}
      />
    );
  }
}

export default Game;
