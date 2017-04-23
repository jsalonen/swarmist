import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const ServiceUpdateStatus = ({service}) => {
  return <div />;
  /*
  if(props.updateStatus.state === 'updating') {
    return (
      <span>
        <CircularProgress size={14} thickness={2} /> &nbsp;
        {props.updateStatus.state || ''}
      </span>
    );
  } else {
    return (
      <span>{props.updateStatus.state || ''}</span>
    );
  }
  */
};

export default ServiceUpdateStatus;
