import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

import NodeStore from './stores/NodeStore';

// Required for onTouchTap (http://stackoverflow.com/a/34015469/988941)
injectTapEventPlugin();

const stores = {
  nodeStore: new NodeStore()
}

ReactDOM.render((
  <Router history={hashHistory} routes={routes(stores)}></Router>
), document.getElementById('root'))
