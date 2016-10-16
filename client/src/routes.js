import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';

const routes = (props) => (
  <Route path="/" component={App} dockerNodeStore={props.dockerNodeStore}>
    <IndexRoute component={Dashboard} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
