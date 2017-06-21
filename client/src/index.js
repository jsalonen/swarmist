import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './app';
import { Provider } from 'mobx-react';
import NodeStore from './stores/NodeStore';

// Required for onTouchTap (http://stackoverflow.com/a/34015469/988941)
injectTapEventPlugin();

const stores = {
  nodeStore: new NodeStore()
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
