import {observer} from 'mobx-react';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ConnectionStatusInfo from '../ConnectionStatusInfo';

const App = observer(
  class App extends Component {
    render() {
      const {dockerNodeStore} = this.props.route;
      let main;

      if(!dockerNodeStore.connected && !dockerNodeStore.error) {
        main =
          <ConnectionStatusInfo          
           title="Connecting..."
           subtitle="Connecting to Docker node - please wait" />
      } else if(dockerNodeStore.error) {
        main =
          <ConnectionStatusInfo
            title="Connection Error"
            subtitle={dockerNodeStore.error}/>
      } else {
        main = this.props.children;
      }

      return (
        <MuiThemeProvider>
          <div className="App">
            <AppBar title={"Swarmist"} />

            <div className="main">
              {main}
            </div>
          </div>
        </MuiThemeProvider>
      );
    }
  }
);

export default App;
