import {observer} from 'mobx-react';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const ConnectionInfo = observer(
class ConnectionInfo extends Component {
  render() {
    return (
      <h2>{this.props.connectionStore.error}</h2>
    )
  }
});

class App extends Component {
  render() {
    const {connectionStore} = this.props.route;

    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title={"Swarmist"} />

          <ConnectionInfo connectionStore={connectionStore} />

          <div className="main">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
