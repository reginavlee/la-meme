import React from 'react';
import { Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PlayerTable from './PlayerTable';


const Dashboard = (props) => {
  return (
    <div>
      <Col md={6}>
        <Panel>
          <h3 className="text-center"> user-list </h3>
          <p className="text-center"> online users: {props.onlineCount} </p>
        </Panel>
        <PlayerTable
          data={props.playerTableData}
        />
      </Col>
      <Col md={6} >
        <Panel>
          <h3 className="text-center"> your stats </h3>
        </Panel>
        <Link to="play">This takes you to chat-room page</Link>
      </Col>
    </div>
  );
};

export default Dashboard;

