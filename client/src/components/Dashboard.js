import React, { Component } from "react";
import Services from "./Services";
import Tasks from "./Tasks";
import ServiceLogs from "./ServiceLogs";

class Dashboard extends Component {
  render() {
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
