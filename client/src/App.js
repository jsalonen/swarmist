import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Services from './Services.js';
import Tasks from './Tasks.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Swarmist" />
          <Services />
          <Tasks />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
