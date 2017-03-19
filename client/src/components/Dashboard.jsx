import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PlayerTable from './PlayerTable';
import RoomsTable from './RoomsTable';


const Dashboard = (props) => {
  const userProfile = props.profile ? props.profile : {};

  return (
    <div>
      <Row>
        <div className="text-center">
          <img className="text-center" alt='profile_img' src={userProfile.picture} />
        </div>
      </Row>
      <Row>
        <Col md={6}>
          <Panel>
            <h3 className="text-center"> user-list </h3>
            <p className="text-center"> online users: {props.onlineCount} </p>
          </Panel>
          <PlayerTable
            data={props.playerTableData}
            setupUserInvite={props.setupUserInvite}
          />
        </Col>
        <Col md={6} >
          <Panel>
            <h3 className="text-center"> room-list </h3>
            <p className="text-center"> active rooms: 0 </p>
          </Panel>
          <RoomsTable />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

