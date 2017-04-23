import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ConnectionStatusInfo from '../ConnectionStatusInfo';

const AppMain = inject('nodeStore')(observer(
  class AppMain extends Component {
    render() {
      let main;
      const {error, connected, isInSwarm} = this.props.nodeStore;

      if(error) {
        main =
          <ConnectionStatusInfo
            title="Connection Error"
            subtitle={error}/>
      } else if(connected && isInSwarm === false) {
        main =
          <ConnectionStatusInfo
            title="Swarm Mode Not Enabled"
            subtitle="This node is not running in a swarm. Please enable swarm mode to continue." />
      } else {
        main = this.props.children;
      }

      return (
        <div className="app-main">{main}</div>
      );
    }
  }
));

export default AppMain;
