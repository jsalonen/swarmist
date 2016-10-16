import React, { Component } from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AppMain from '../AppMain';

const App = observer(
  class App extends Component {
    componentDidMount() {
      const {nodeStore} = this.props.route;
      nodeStore.connect();
      nodeStore.polling = true;

      this.pollLoop();
    }

    pollLoop() {
      const {nodeStore} = this.props.route;

      if(nodeStore.polling) {
        nodeStore.getServices.bind(this)();
        nodeStore.getTasks.bind(this)();
      }
    }

    render() {
      const {nodeStore} = this.props.route;

      return (
        <MuiThemeProvider>
          <div className="App">
            <AppBar title={"Swarmist"} />
            <div className="main">
              <AppMain {...nodeStore} inSwarm={nodeStore.inSwarm}>
                {this.props.children}
              </AppMain>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  }
);

export default App;
