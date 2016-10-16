import {observer} from 'mobx-react';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ConnectionErrorInfo from '../ConnectionErrorInfo';

const App = observer(
  class App extends Component {
    render() {
      const {connectionStore} = this.props.route;
      let main = <div />;

      if(connectionStore.ok) {
        main = this.props.children;
      }
      if (connectionStore.error) {
        main = <ConnectionErrorInfo error={connectionStore.error}/>
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
