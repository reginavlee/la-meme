import React, { Component } from 'react';
import { Link } from 'react-router';

class Game extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1> Game Stuff here! </h1>
        <Link to='/'>This takes you to home page</Link>
      </div>
    );
  }
}

export default Game;