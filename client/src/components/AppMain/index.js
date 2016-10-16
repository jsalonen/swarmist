import React, { Component } from 'react';
import ConnectionStatusInfo from '../ConnectionStatusInfo';

class AppMain extends Component {
  render() {
    let main;
    const {error, connected, inSwarm} = this.props;

    if(error) {
      main =
        <ConnectionStatusInfo
          title="Connection Error"
          subtitle={error}/>
    } else if(connected && !inSwarm) {
      main =
        <ConnectionStatusInfo
          title="Swarm Mode Not Enabled"
          subtitle="This node is not running in a swarm. Please enable swarm mode to continue." />
    } else if(!connected) {
      main = <div />
    } else {
      main = this.props.children;
    }

    return (
      <div>{main}</div>
    );
  }
}

export default AppMain;
