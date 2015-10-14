import React from 'react';
import Router from 'react-router'
import routes from './config/routes';

Router.run(routes, (Root, state) => {
  // {...state} copies over properties from state to Root
  React.render(<Root {...state} />, document.getElementById('app'));
});
