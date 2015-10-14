import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Profile from '../components/Profile';

import { Router, Route, DefaultRoute} from 'react-router';
/* Destructuring replaces:
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route; */

export default (
  <Route name="app" path="/" handler={Main}>
    <Route name="profile" path="profile/:username" handler={Profile} />
    <DefaultRoute handler={Home} />
  </Route>
);