import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Subheader from "material-ui/Subheader";

const Tasks = inject("nodeStore")(
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
              <Subheader>Logs</Subheader>
              {nodeStore.selectedServices.map((service, index) => {
                return (
                  <pre key={index}>{nodeStore.serviceLogs.get(service)}</pre>
                );
              })}
            </div>
          );
        }
      }
    }
  )
);

export default Tasks;
