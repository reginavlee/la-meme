import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MemeRoomHeader from './MemeRoomHeader';
import GameDisplay from './GameDisplay';

const MemeRoom = (props) => {
  return (
    <Grid>
      <MemeRoomHeader
        roomOccupancy={props.roomOccupancy}
        currentRoom={props.currentRoom}
      />
      <Row className="game-board">
        <Col xs={12} md={12}>
          <GameDisplay handleMessage={props.handleMessage} />
        </Col>
      </Row>
      {/* <Button bsStyle="primary" onClick={this.createRoom}> Click</Button> */}
    </Grid>
  );
};

export default MemeRoom;
