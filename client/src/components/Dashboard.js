import React, { Component } from "react";
import Services from "./Services";
import Tasks from "./Tasks";
import { Tabs, Tab } from "material-ui/Tabs";
import ServiceLogs from "./ServiceLogs";
/*
import { Link } from 'react-router';

const styles = {
  button: {
    margin: 0.6 + 'rem'
  }
};
*/

class Dashboard extends Component {
  render() {
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
        <Tabs
          inkBarStyle={{ background: "rgb(0, 188, 212)" }}
          tabItemContainerStyle={{ backgroundColor: "rgb(64, 200, 232)" }}
        >
          <Tab label="Tasks">
            <Tasks />
          </Tab>
          <Tab label="Logs">
            <ServiceLogs />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
