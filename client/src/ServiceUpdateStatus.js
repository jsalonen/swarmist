import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class ServiceUpdateStatus extends Component {
  render() {
    if(this.props.state === 'updating') {
      return (
        <span>
          <CircularProgress size={14} thickness={2} /> &nbsp;
          {this.props.state || ''}
        </span>
      );
    } else {
      return (
        <span>{this.props.state || ''}</span>
      );
    }
  }
}

export default ServiceUpdateStatus;