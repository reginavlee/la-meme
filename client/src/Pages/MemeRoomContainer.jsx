import React, { Component } from 'react';
import io from 'socket.io-client';
import genRandomTokenString from '../../utils/genRandomString';
import MemeRoom from '../components/MemeRoom';
import axios from 'axios';

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
      round: 0,
      intermission: null,
      memePhoto: []
    };
    this.emitMessage = this.emitMessage.bind(this);
    this.MemePhoto = this.MemePhoto.bind(this)
  }

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.createRoom();
    this.renderMessage();
    this.RoomOccupancy();
    this.MemePhoto();
    console.log("THIS", this);
    window.onbeforeunload = () => {
      // this.removeUser();
    };
  }
  /**
   * fire off socket connection on component mounting
   */
  componentDidMount() {
    this.listenforCountdown();
    this.listenForConnectionType();
    this.listenForIntermission();
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
    // this.removeUser();
    window.onbeforeunload = null;
  }
  /**
   * removes a user on the server
   */
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
  /**
   * creates a room on the server to hold sockets
   */
  createRoom() {
    const self = this;
    this.socket.emit('create-room', 'testRoom');
    this.socket.on('join', (roomname) => {
      self.setState({
        currentRoom: roomname,
      });
    });
  }
  /**
   * triggers the server to start the countdown
   */
  triggerCountDown() {
    if (!this.state.countingDown && this.state.playerCount === 2 && this.state.connectionType !== 'spectator') {
      this.socket.emit('start-round', 'testRoom');
    }
  }
  /**
   * listens for server's assignment of connectionType
   */
  listenForConnectionType() {
    this.socket.on('status', (connectionType) => {
      this.setState({
        connectionType
      });
    });
  }
  /**
   * listens for the time that is emitted from server ( every second )
   */
  listenforCountdown() {
    const self = this;
    this.socket.on('count-down', ({ time, countingDown }) => {
      self.setState({
        timer: time,
        countingDown
      });
    });
  }
  /**
   * round is over, updates round count
   */
  roundOver() {
    const self = this;
    this.socket.on('round-over', (round) => {
      console.log(`round ${round} is over!`);
      const count = round + 1;
      this.hideMemePhoto();
      this.showMeme();
      self.setState({
        countingDown: false,
        round: count
      });
    });
  }
  /**
   * shows both players memes to everyone
   */
  showMeme() {
    console.log('should show meme');
    document.getElementById('display-meme').removeAttribute('class');

  }
  /**
   * hides both players memes from everyone
   */
  hideMeme() {
    console.log('should hide meme');
    document.getElementById('display-meme').className = 'meme-display';
  }

  /**
   * shows plain photo to everyone
   */
  showMemePhoto() {
    document.getElementById('photo').removeAttribute('class');
  }
  /**
   * hides photo
   */
  hideMemePhoto() {
    document.getElementById('photo').className = 'photo-display';
  }

  /**
   * listens for intermission & game-over from the server countdown
   */
  listenForIntermission() {
    const self = this;
    this.socket.on('intermission', () => {
      self.setState({
        intermission: true
      });
    });
    this.socket.on('intermission-over', () => {
      self.hideMeme();
      self.MemePhoto();
{/**      this.getMemePhoto(); **/}
      self.showMemePhoto();
      self.setState({
        intermission: false
      });
    });
    this.socket.on('game-over', () => {
      self.setState({
        gameOver: true
      });
    });
  }
  /**
   * listens for room occupancy changes from the server
   */
  RoomOccupancy() {
    this.socket.on('occupancy', ({ playerCount, spectatorCount }) => {
      this.setState({
        playerCount,
        spectatorCount
      });
    });
  }

  MemePhoto() {
    const self = this;
    this.socket.on('photoUrl', (photoUrl) => {
    console.log("URL*****", photoUrl);
      self.setState({
        memePhoto: photoUrl
      })
    })
  }
  /**
   * handles sending message through socket.io ( not used as of now, maybe chat later? )
   */
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
  /**
   * handles rendering message to all clients ( not used as of now, maybe chat later? )
   */
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
        intermission={this.state.intermission}
        memePhoto={this.state.memePhoto}
      />
    );
  }
}

export default Game;
