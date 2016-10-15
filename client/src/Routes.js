import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from './App';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';

const Routes = () => (
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
