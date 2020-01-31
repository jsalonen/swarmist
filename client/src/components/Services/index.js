import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Subheader from 'material-ui/Subheader';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import ServiceReplicaStatus from '../ServiceReplicaStatus';

const Services = inject('nodeStore')(
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
                    <TableHeaderColumn>Service</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: '3rem' }}>
                      Replicas
                    </TableHeaderColumn>
                    <TableHeaderColumn style={{ width: '5rem' }}>
                      Ports
                    </TableHeaderColumn>
                    <TableHeaderColumn style={{ width: '8rem' }}>
                      Networks
                    </TableHeaderColumn>
                    <TableHeaderColumn>Labels</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {nodeStore.services.map((service, index) => (
                    <TableRow key={index}>
                      <TableRowColumn>
                        <b>{service.Spec.Name}</b>
                        <br />
                        {service.Spec.TaskTemplate.ContainerSpec.Image}
                      </TableRowColumn>
                      <TableRowColumn
                        style={{ width: '3rem' }}
                      >
                        <ServiceReplicaStatus
                          running={service.ReplicasRunning}
                          desired={
                            service.Spec.Mode.Replicated &&
                            service.Spec.Mode.Replicated.Replicas
                          }
                        />
                      </TableRowColumn>
                      <TableRowColumn style={{ width: '5rem' }}>
                        {(service.Endpoint.Ports || []).map((port, index) => (
                          <div key={index} style={{ padding: '1px 0' }}>
                            {port.PublishedPort}:{port.TargetPort}
                            &nbsp;
                            <span style={{ opacity: 0.5 }}>
                              {port.Protocol}
                            </span>
                          </div>
                        ))}
                      </TableRowColumn>
                      <TableRowColumn style={{ width: '8rem' }}>
                        {(service.Endpoint.VirtualIPs || []).map(
                          (ip, index) => {
                            const network = nodeStore.networks.find(
                              network => network.Id === ip.NetworkID
                            );
                            return (
                              <div key={index} style={{ padding: '1px 0' }}>
                                {network.Name}
                              </div>
                            );
                          }
                        )}
                      </TableRowColumn>
                      <TableRowColumn>
                        {Object.keys(service.Spec.Labels || {}).map(key => {
                          const value = service.Spec.Labels[key];

                          return (
                            <div key={key}>
                              {key} = {value}
                            </div>
                          );
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
