import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export const ServiceUpdateStatus = (props) => {
  if(props.state === 'updating') {
    return (
      <span>
        <CircularProgress size={14} thickness={2} /> &nbsp;
        {props.state || ''}
      </span>
    );
  } else {
    return (
      <span>{props.state || ''}</span>
    );
  }
};

export default ServiceUpdateStatus;
