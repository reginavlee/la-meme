import React from 'react';
import { Col, Panel, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PlayerTable from './PlayerTable';
import RoomsTable from './RoomsTable';

const Dashboard = (props) => {
  const userProfile = props.profile ? props.profile : {};
  const roomsCount = props.roomTableData ? props.roomTableData.size : 0;
  return (
    <div>
      <Row>
        <div className="text-center">
          <Image className="text-center profile-photo" alt='profile_img' src={userProfile.picture} circle thumbnail />
          {userProfile ? <h3>{userProfile.username} </h3> : ''}
          <hr />
        </div>
      </Row>
      <Row>
        <Col md={6}>
          <Panel>
            <h3 className="text-center"> users </h3>
            <p className="text-center"> online users: {props.onlineCount} </p>
          </Panel>
          <PlayerTable
            data={props.playerTableData}
            setupUserInvite={props.setupUserInvite}
          />
        </Col>
        <Col md={6} >
          <Panel>
            <h3 className="text-center"> rooms </h3>
            <p className="text-center"> active rooms: { roomsCount } </p>
          </Panel>
          <RoomsTable
            data={props.roomTableData}
            joinRoom={props.joinRoom}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
