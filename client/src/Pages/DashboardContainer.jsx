import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import io from 'socket.io-client';
import genRandomTokenString from '../../utils/genRandomString';

import AlertsContainer from '../components/alerts/AlertsContainer';
import Dashboard from '../components/Dashboard';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    const token = genRandomTokenString();
    this.state = {
      authToken: token,
      username: `Jahosh${token}`,
      users: new Map(),
      onlineCount: 0,
      newUser: false
    };
  }
  /**
   * Init connect to socket.io
   */
  componentWillMount() {
    // there will be duplicates inside of the user-list untill we get unique usernames going ~
    this.socket = io('http://localhost:3000');
    this.createUser();
    window.onbeforeunload = () => {
      this.emitLeftDashboard();
    };
  }
  componentDidMount() {
    this.emitJoinedDashboard();
    this.listenForGlobalCount();
    this.listenForRoomData();
    this.newUserJoined();
    this.socket.on('test', (test) => {
      console.log(test);
    });
    this.handleRoomData();
  }
  componentWillUnmount() {
    this.emitLeftDashboard();
    window.onbeforeunload = null;
  }
  /**
   * {Global-Event} A new user has joined the socket.io server, notify user 
   */
  newUserJoined() {
    this.socket.on('new-user', (d) => {
      console.log(d, 'recieved new user event');
      this.setState({
        newUser: true
      });
      setTimeout(() => {
        this.setState({
          newUser: false
        });
      }, 2000);
    });
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
  emitJoinedDashboard() {
    this.socket.emit('joined-dashboard');
  }
  emitLeftDashboard() {
    this.socket.emit('left-dashboard');
  }
  listenForGlobalCount() {
    const self = this;
    this.socket.on('connected-user', (count, userInfo) => {
      // grab newly connected users info
      const { sid, un, ol } = userInfo;
      const connectedUsers = this.state.users;
      connectedUsers.set(sid, { un, ol });
      self.setState({
        onlineCount: count,
        users: connectedUsers
      });
    });
  }
  listenForRoomData() {
    this.socket.on('rooms-data', (data) => {
      this.setState({
        data
      });
    });
  }
  handleRoomData() {
  }
  render() {
    let roomData = {rm: '', rs: 0 };
    if (this.state.data) {
      roomData = JSON.parse(this.state.data);
      console.log(roomData);
    }
    const data = [{
      rm: 'testRoom',
      rs: 1
    }];
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Dashboard
              onlineCount={this.state.onlineCount}
              playerTableData={this.state.users}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <AlertsContainer
              newUser={this.state.newUser}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DashboardContainer;
