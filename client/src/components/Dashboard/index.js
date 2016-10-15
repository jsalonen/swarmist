import React, { Component } from 'react';
import Services from '../../Services';
import Tasks from '../../Tasks';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedServices: []
    };
  }

  onServiceSelection(selectedServices) {
    this.setState({
      selectedServices: selectedServices
    });
  }

  render() {
    return (
      <div>
        <Services
         onSelection={this.onServiceSelection.bind(this)}
         selectedServices={this.state.selectedServices}/>
        <Tasks selectedServices={this.state.selectedServices}/>
      </div>
    );
  }
}

export default Dashboard;
