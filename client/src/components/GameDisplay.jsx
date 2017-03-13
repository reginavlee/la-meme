import React, { Component } from 'react';
import { Well, Col, Image } from 'react-bootstrap';
import GameInput from './GameInput';

class GameDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <Well className="meme-content" bsSize="large">
          <div id="display-meme" className="meme-display">
            <Col xs={6} md={4}>
              <Image className="meme" src="https://files.slack.com/files-pri/T2SV1LBC6-F4G3N5S4A/joshmeme.png" />
            </Col>
            <Col xs={6} md={4}>
              <div className="text-center">
                Meme ShowDown
              </div>
            </Col>
            <Col xs={6} md={4}>
              <Image className="meme" src="https://files.slack.com/files-pri/T2SV1LBC6-F4G3N5S4A/joshmeme.png" />
            </Col>
            {/* <ul id="messages" />*/}
          </div>
        </Well>
        { this.props.connectionType === 'player' ?
          <GameInput handleMessage={this.props.handleMessage} />
        : '' }
      </div>
    );
  }
}

export default GameDisplay;
