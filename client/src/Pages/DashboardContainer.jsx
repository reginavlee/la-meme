import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import io from 'socket.io-client';

import ReactTable from 'react-table';
import style from 'react-table/react-table.css';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  /**
   * Init connect to socket.io
   */
  componentWillMount() {
    this.socket = io('http://localhost:3000');
    window.onbeforeunload = () => {
      this.emitLeftDashboard();
    };
  }
  componentDidMount() {
    this.emitJoinedDashboard();
  }
  componentWillUnmount() {
    this.emitLeftDashboard();
    window.onbeforeunload = null;
  }
  emitJoinedDashboard() {
    this.socket.emit('joined-dashboard');
  }
  emitLeftDashboard() {
    this.socket.emit('left-dashboard');
  }
  render() {
    const data = [{
      roomname: 'testRoom',
      roomCount: 1
    }];
    const columns = [
      {
        header: 'Room name',
        accessor: 'roomname'
      },
      {
        header: 'Room occupancy',
        accessor: 'roomCount'
      }
    ];

    return (
      <Grid>
        <Row>
          <Col md={6}>
            <Panel>
              <h3 className="text-center"> room-list </h3>
            </Panel>
            <ReactTable
              data={data}
              style={style}
              columns={columns}
              defaultPageSize={10}
            />
          </Col>
          <Col md={6} >
            <Panel>
              <h3 className="text-center"> your stats </h3>
            </Panel>
            <Link to="play">This takes you to chat-room page</Link>
            <Dashboard />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DashboardContainer;
