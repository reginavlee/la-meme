import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, hashHistory, IndexRoute } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import App from './components/App';
import Home from './Pages/Home';
import Navigation from './components/Navigation';
import Dashboard from './Pages/Dashboard';
import MemeRoomContainer from './Pages/MemeRoomContainer';

ReactDOM.render(
  <Router>
    <div>
      <Navigation />
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/play" component={MemeRoomContainer} />
    </div>
  </Router>
  , document.getElementById('app'));
