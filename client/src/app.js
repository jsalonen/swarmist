import React, { Component } from 'react';
import {observer} from 'mobx-react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import AppMain from './components/AppMain';
import './app.css';
import Dashboard from './components/Dashboard';

const App = observer(
  class App extends Component {
    render() {
      return (
		    <Router>
	        <MuiThemeProvider>
	          <div className="App">
	            <AppBar title="Swarmist" />
              <AppMain>
  				  	  <Route exact path="/" component={Dashboard}/>
              </AppMain>
	          </div>
	        </MuiThemeProvider>
        </Router>
      );
    }
  }
);

export default App;
