import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotFound from './components/NotFound';
import App from './containers/App';
import Dashboard from './containers/Dashboard';
import CreateService from './containers/CreateService';

const routes = (props) => (
  <Route path="/" name="Dashboard" component={App} nodeStore={props.nodeStore}>
    <IndexRoute component={Dashboard} nodeStore={props.nodeStore} />
    <Route path="/services/create" name="Create Service" component={CreateService} />
    <Route path="*" name="Not Found" component={NotFound} />
  </Route>
);

export default routes;
