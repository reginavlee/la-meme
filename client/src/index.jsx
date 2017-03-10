import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute } from 'react-router';

import App from './components/App.jsx';
import Home from './Pages/Home.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import MemeRoom from './Pages/MemeRoom.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/play' component={MemeRoom} />
    </Route>    
  </Router> 
  , document.getElementById('app'));
