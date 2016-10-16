import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  margin: 0,
  padding: 1 + 'rem'
};

const ConnectionErrorInfo = (props) => {
  return (
  	<Paper style={style} zDepth={2}>
  	  <h2>Connection Error</h2>
  	  <h3>{props.error}</h3>
	</Paper>
  );
};

export default ConnectionErrorInfo;
