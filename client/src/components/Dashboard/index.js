import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Services from '../Services';
import Tasks from '../Tasks';

const Dashboard = observer(
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
      const {nodeStore} = this.props.route;

      return (
        <div>
          <Services
           services={nodeStore.services}
           onSelection={this.onServiceSelection.bind(this)}
           selectedServices={this.state.selectedServices}/>
          <Tasks
           tasks={nodeStore.tasks}
           selectedServices={this.state.selectedServices}/>
        </div>
      );
    }
  }
);

export default Dashboard;
