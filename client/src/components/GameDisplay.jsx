import React, { Component } from 'react';
import { Well, Col, Image } from 'react-bootstrap';
import GameInput from './GameInput';

class GameDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInput: ''
    };

  }
    setGameInput(text) {
    this.setState({gameInput: text})
    console.log(this.state.gameInput);
  }
  render() {
    return (
      <div>
        <Col xs={12} md={12}>
        <div id="photo">
          <Image className="photo" src= {this.props.memePhoto} />
          { this.props.connectionType === 'player' ?
          <GameInput handleMessage={this.props.handleMessage} />
        : '' }
          <GameInput handleMessage={this.props.handleMessage} setGameInput={this.setGameInput.bind(this)}> 
          </GameInput>
          </div>
        </Col>

        <Well className="meme-content" bsSize="large">
          <div id="display-meme" className="meme-display">
            <Col xs={6} md={4}>
              <Image className="meme" src={this.props.memePhoto} />
                <div className="caption">{this.state.gameInput}
              </div>
            </Col>

            <Col xs={6} md={4}>
              <Image className="meme" src={this.props.memePhoto} />
              <div className="caption">other user's caption
              </div>
            </Col>
            {/* <ul id="messages" />*/}
          </div>
        </Well>
      </div>
    );
  }
}

export default GameDisplay;
