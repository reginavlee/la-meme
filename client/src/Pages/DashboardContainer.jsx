import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import genRandomTokenString from '../../utils/genRandomString';

import AlertsContainer from '../components/alerts/AlertsContainer';
import Dashboard from '../components/Dashboard';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    const token = genRandomTokenString();
    this.state = {
      users: new Map(),
      onlineCount: 0,
      newUser: false
    };
  }
  /**
   * Init user creation on the server
   * emit to the server a user has joined dashboard/lobby
   * setup listener to listen for window close (emit left dashboard)
   */
  componentWillMount() {
    this.createUser(this.props.profile.username);
    this.emitJoinedDashboard(this.props.profile.username);
    window.onbeforeunload = () => {
      this.emitLeftDashboard();
    };
  }
  /**
   * everytime the component mounts, lets listen for the global online count and setState accordingly
   */
  componentDidMount() {
    this.props.socket.on('new-user', (count) => {
      this.setState({
        onlineCount: count
      });
    });
    this.listenForGlobalCount();
  }
  componentWillReceiveProps(nextProps) {
    this.listenForGlobalCount();
    this.listenForRoomData();
    this.newUserJoined();
    this.handleRoomData();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }
  componentWillUnmount() {
    this.emitLeftDashboard();
    window.onbeforeunload = null;
  }
  /**
   * {Global-Event} A new user has joined the socket.io server, notify user 
   */
  newUserJoined() {
    this.props.socket.on('new-user', (d) => {
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
  createUser(username) {
    const payload = {
      username
    };
    this.props.socket.emit('create-user', payload);
  }
  emitJoinedDashboard(username) {
    this.props.socket.emit('joined-dashboard', username);
  }
  emitLeftDashboard(username) {
    this.props.socket.emit('left-dashboard');
  }
  listenForGlobalCount() {
    const self = this;
    this.props.socket.on('connected-user', (count, userInfo, username) => {
      // grab newly connected users info
      const { sid, location } = userInfo;
      const connectedUsers = this.state.users;
      connectedUsers.set(username, { sid, location });
      self.setState({
        onlineCount: count,
        users: connectedUsers
      });
    });
  }
  listenForRoomData() {
    this.props.socket.on('rooms-data', (data) => {
      this.setState({
        data
      });
    });
  }
  handleRoomData() {
  }
  render() {
    return (
      <Grid>
        <Row>
          <Button bsStyle="primary" onClick={ () => {
            this.props.auth.logout();
            this.props.logout();
            console.log('fired');
            }}>Logout</Button> 
          <Col md={12}>
            <Dashboard
              onlineCount={this.state.onlineCount}
              playerTableData={this.state.users}
              profile={this.props.profile}
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
