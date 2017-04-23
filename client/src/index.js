import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import App from "./app";
import { Provider } from "mobx-react";
import NodeStore from "./stores/NodeStore";

// Required for onTouchTap (http://stackoverflow.com/a/34015469/988941)
injectTapEventPlugin();

const stores = {
  nodeStore: new NodeStore()
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);

/*
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
*/
