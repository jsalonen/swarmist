import React, { Component } from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AppMain from '../components/AppMain';
import { Link } from 'react-router';
import './App.css';

const style = {
  homeButton: {
    color: 'inherit',
    textDecoration: 'none'
  }
};

const App = observer(
  class App extends Component {
    componentDidMount() {
      const {nodeStore} = this.props.route;
      nodeStore.connect();
      nodeStore.polling = true;

      setInterval(() => {
        this.pollLoop();
      }, 1000);
    }

    pollLoop() {
      const {nodeStore} = this.props.route;

      if(nodeStore.polling) {
        if(nodeStore.inSwarm) {
          nodeStore.getServices();
          nodeStore.getTasks();
        }
        if(nodeStore.error) {
          nodeStore.connect();
        }
      }
    }

    render() {
      const {nodeStore} = this.props.route;

      return (
        <MuiThemeProvider>
          <div className="App">
            <AppBar title={<Link to="/" style={style.homeButton}>Swarmist</Link>} />
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
