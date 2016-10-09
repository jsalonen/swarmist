import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Services from './Services.js';
import Tasks from './Tasks.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedServices: []
    };
  }

  onServiceSelection(selectedServices) {
    this.setState({
      selectedServices: selectedServices
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Swarmist" />
          <Services
           onSelection={this.onServiceSelection.bind(this)}
           selectedServices={this.state.selectedServices}/>
          <Tasks selectedServices={this.state.selectedServices}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
