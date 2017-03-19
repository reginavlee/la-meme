import React from 'react';
import { Col, Row, Label,  Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Header Component for MemeRoom
 * @param {*} props
 */
const MemeRoomHeader = (props) => {
  const spectators = props.spectators;
  const specDisplay = spectators > 0 ? spectators : 0;

  return (
    <div id="grad">
      <Row className="game-board-header-content">
        <Col xs={4} md={4}>
          <h3> <Label bsStyle="default" bsSize="large">{props.currentRoom}</Label></h3>

          <br />
          <h3> players: <Label bsStyle="primary">{props.roomOccupancy}</Label> </h3>
        </Col>
        <Col xs={4} md={4}>
          <h1 className="text-center"></h1>
          <div className="text-center timer-cont">
            <Link to="/dashboard" >Dashboard</Link>
          <h3> time left: </h3>
          <Label bsStyle="danger" className="timer">{props.currentTime}</Label>
          </div>

        </Col>
        <Col xs={4} md={4}>
          <div className="text-center">
          {/**
            <h3><Label bsStyle="danger" bsSize="large">exit</Label></h3>
           **/}
            <br />
            <h3> spectators: <Label bsStyle="primary">{specDisplay}</Label> </h3>
          </div>
        </Col>
        <br />
      </Row>
    </div>
  );
};

export default MemeRoomHeader;
