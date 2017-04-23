import React, { Component } from "react";
import Services from "./Services";
import Tasks from "./Tasks";
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
        <hr />
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <Tasks />
          </div>
          <div style={{ width: "50%" }}>
            <ServiceLogs />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
