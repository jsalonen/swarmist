import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import Services from './Services';
import Tasks from './Tasks';
/*
import { Link } from 'react-router';

const styles = {
  button: {
    margin: 0.6 + 'rem'
  }
};
*/

const Dashboard = inject('nodeStore')(observer(
  class Dashboard extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const {nodeStore} = this.props;
      /*
          <FlatButton
            label="Create Service"
            containerElement={<Link to="/services/create" />}
            primary={true}
            style={styles.button}
            icon={<i className="material-icons">add</i>}
          />
      */

      return (
        <div>
          <Services />
          <Tasks />
        </div>
      );
    }
  }
));

export default Dashboard;
