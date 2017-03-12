import React from 'react';
import { Col, Row, Label,  Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Header Component for MemeRoom
 * @param {*} props
 */
const MemeRoomHeader = (props) => {
  return (
    <div>
      <Row className="game-board-header-content">
        <Col xs={6} md={4}>
          <h3> <Label bsStyle="default" bsSize="large">{props.currentRoom}</Label></h3>
          <br />
          <h3> players: <Label bsStyle="primary">{props.roomOccupancy}</Label> </h3>
        </Col>
        <Col xs={6} md={4}>
          <h1 className="text-center">la même</h1>
          <p className="text-center">Counter will go here</p>
          <div className="text-center">
            <Link to="/">This takes you to home page</Link>
          </div>
        </Col>
        <Col xs={6} md={4}>
          <div className="text-center">
            <Button bsSize="large" bsStyle="danger" block>Exit</Button>
          </div>
        </Col>
        <br />
      </Row>
    </div>
  );
};

export default MemeRoomHeader;
