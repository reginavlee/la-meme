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
    <div>
      <Row className="game-board-header-content">
        <Col xs={4} md={4}>
          <h3> <Label bsStyle="default" bsSize="large">{props.currentRoom}</Label></h3>
          <br />
          <h3> players: <Label bsStyle="primary">{props.roomOccupancy}</Label> </h3>
        </Col>
        <Col xs={4} md={4}>
          <h1 className="text-center">la même</h1>
          <p className="text-center">{props.currentTime}</p>
          <div className="text-center">
            <Link to="/">This takes you to home page</Link>
            <Link to="/dashboard">Back to dashboard</Link>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <div className="text-center">
            <h3><Label bsStyle="danger" bsSize="large">exit</Label></h3>
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
