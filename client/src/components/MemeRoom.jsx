import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MemeRoomHeader from './MemeRoomHeader';
import GameDisplay from './GameDisplay';

const MemeRoom = (props) => {
  return (
  <div >
    <Grid>
      { /** props.intermission ? 'intermission' : 'not-intermission' **/}
      <MemeRoomHeader
        roomOccupancy={props.roomOccupancy}
        spectators={props.spectators}
        currentRoom={props.currentRoom}
        currentTime={props.currentTime}
      />
      <Row className="game-board">
        <Col xs={12} md={12} >
          <GameDisplay
            handleMessage={props.handleMessage}
            connectionType={props.connectionType}
            memePhoto={props.memePhoto}
          />
        </Col>
      </Row>
      {/* <Button bsStyle="primary" onClick={this.createRoom}> Click</Button> */}
    </Grid>
    </div>
  );
};

export default MemeRoom;
