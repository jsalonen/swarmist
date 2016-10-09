import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class ServiceReplicaStatus extends Component {
  render() {
    let scalingStatus = '';
    if(this.props.replicas > this.props.replicasRunning) {
      scalingStatus = ' (scaling up \u2191)';
    }
    if(this.props.replicas < this.props.replicasRunning) {
      scalingStatus = ' (scaling down \u2193)';
    }
    return (
      <span>
        {this.props.replicasRunning}
        &nbsp; / &nbsp;
        {this.props.replicas}
        {scalingStatus}
      </span>
    );
  }
}

export default ServiceReplicaStatus;