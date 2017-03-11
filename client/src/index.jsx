import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import MemeRoom from './Pages/MemeRoom';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/play" component={MemeRoom} />
    </Route>
  </Router>
  , document.getElementById('app'));
