import React, { Component } from 'react';

class ServiceReplicaStatus extends Component {
  render() {
    const running = this.props.replicasRunning;
    const desired = this.props.replicas;
    let symbol = '?';
    let  color = 'black';

    if(desired === 0 && running === 0) {
      symbol = '\u2716';
      color = 'red';
    } else if(desired === running) {
      symbol = '\u2714';
      color = 'green';
    } else if(desired > running && running === 0) {
      symbol = '\u25B2';
      color = 'red';
    } else if(desired > running) {
      symbol = '\u25B2';
      color = 'green';
    } else if(desired < running) {
      symbol = '\u25BC';
      color = 'orange';
    }

    return (
      <span>
        <span style={{color: color}}>{symbol}</span>        
        {' '}
        {running}
        {' / '} 
        {desired}
      </span>
    );
  }
}

export default ServiceReplicaStatus;