import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Subheader from "material-ui/Subheader";
import Chip from "material-ui/Chip";
import { orange100 } from "material-ui/styles/colors";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import IdField from "../IdField";
//import ServiceUpdateStatus from "../ServiceUpdateStatus";
import ServiceReplicaStatus from "../ServiceReplicaStatus";

const Services = inject("nodeStore")(
  observer(
    class Services extends Component {
      onRowSelection(rows) {
        this.props.nodeStore.selectedServices = rows.map(
          index => this.props.nodeStore.services[index].ID
        );
      }

      render() {
        const { nodeStore } = this.props;

        if (!nodeStore.services || !nodeStore.services.length) {
          return (
            <div className="services">
              <Subheader>No services</Subheader>
            </div>
          );
        } else {
          return (
            <div className="services">
              <Subheader>Services</Subheader>
              <Table
                selectable={true}
                multiSelectable={false}
                onRowSelection={this.onRowSelection.bind(this)}
              >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Virtual IP</TableHeaderColumn>
                    <TableHeaderColumn>Ports</TableHeaderColumn>
                    <TableHeaderColumn>Image</TableHeaderColumn>
                    <TableHeaderColumn>Mode</TableHeaderColumn>
                    <TableHeaderColumn>Replicas</TableHeaderColumn>
                    <TableHeaderColumn>Labels</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {nodeStore.services.map((service, index) => (
                    <TableRow
                      key={
                        index
                      } /*selected={selectedServices.indexOf(service.ID) !== -1}*/
                    >
                      <TableRowColumn /*(<IdField value={service.ID} />)*/>
                        {service.Spec.Name}
                      </TableRowColumn>
                      <TableRowColumn>
                        {(service.Endpoint.VirtualIPs || [])
                          .map((ip, index) => {
                            return (
                              <div key={index} /*({ip.NetworkID})*/>
                                {ip.Addr}
                              </div>
                            );
                          })}
                      </TableRowColumn>
                      <TableRowColumn>
                        {(service.Endpoint.Ports || []).map((port, index) => (
                          <span key={index}>
                            {port.Protocol}
                            {" "}
                            {port.PublishedPort}
                            :
                            {port.TargetPort}
                            <br />
                          </span>
                        ))}
                      </TableRowColumn>
                      <TableRowColumn>
                        {service.Spec.TaskTemplate.ContainerSpec.Image}
                      </TableRowColumn>
                      <TableRowColumn>
                        {service.Spec.Mode.Global && <div>Global</div>}
                        {service.Spec.Mode.Replicated && <div>Replicated</div>}
                      </TableRowColumn>
                      <TableRowColumn>
                        <ServiceReplicaStatus
                          running={service.ReplicasRunning}
                          desired={
                            service.Spec.Mode.Replicated &&
                              service.Spec.Mode.Replicated.Replicas
                          }
                        />
                      </TableRowColumn>
                      <TableRowColumn>
                        {Object.keys(service.Spec.Labels || {}).map(key => {
                          const value = service.Spec.Labels[key];

                          return (
                            <div key={key}>
                              {key} = {value}
                            </div>
                          );
                          /*
                            <Chip backgroundColor={orange100} key={key}>
                              {value}
                            </Chip>
                            */
                        })}
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          );
        }
      }
    }
  )
);

export default Services;
