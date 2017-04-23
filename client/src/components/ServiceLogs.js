import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Subheader from "material-ui/Subheader";
import LogWindow from "./LogWindow";

const ServiceLogs = inject("nodeStore")(
  observer(
    class Tasks extends Component {
      render() {
        const { nodeStore } = this.props;

        if (!nodeStore.selectedServices.length) {
          return <div />;
        } else {
          return (
            <div>
              <hr />
              {nodeStore.selectedServices.map((service, index) => {
                return (
                  <LogWindow
                    key={index}
                    logs={nodeStore.serviceLogs.get(service)}
                  />
                );
              })}
            </div>
          );
        }
      }
    }
  )
);

export default ServiceLogs;
