import React, { Component } from 'react';

class IdField extends Component {
  render() {
  	return (
  		<span>{this.props.value.substring(0,24)}</span>
	);
  }
}

export default IdField;
