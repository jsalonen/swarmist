import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IdField from '../IdField';
import ServiceUpdateStatus from '../ServiceUpdateStatus';
import ServiceReplicaStatus from '../ServiceReplicaStatus';

const Services = inject('nodeStore')(observer(
  class Services extends Component {
    onRowSelection(rows) {
      this.props.nodeStore.selectedServices =
        rows.map((index) => this.props.nodeStore.services[index].ID);
    }

    render() {
      const { nodeStore } = this.props;

      if(!nodeStore.services || !nodeStore.services.length) {
        return (
          <div className='services'>
            <Subheader>No services</Subheader>
          </div>
        );
      } else {
        return (
          <div className='services'>
            <Subheader>Services</Subheader>
            <Table selectable={true}
             multiSelectable={false}
             onRowSelection={this.onRowSelection.bind(this)}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Image</TableHeaderColumn>
                  <TableHeaderColumn>Internal IP (Network ID)</TableHeaderColumn>
                  <TableHeaderColumn>Ports</TableHeaderColumn>
                  <TableHeaderColumn>Replicas</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {nodeStore.services.map((service, index) => (
                  <TableRow key={index} /*selected={selectedServices.indexOf(service.ID) !== -1}*/>
                    <TableRowColumn>
                      {service.Spec.Name} (<IdField value={service.ID}></IdField>)
                    </TableRowColumn>
                    <TableRowColumn>{service.Spec.TaskTemplate.ContainerSpec.Image}</TableRowColumn>
                    <TableRowColumn>
                      {(service.Endpoint.VirtualIPs || []).map((ip, index) => {
                        return <span key={index}>{ip.Addr} ({ip.NetworkID})</span>;
                      })}
                    </TableRowColumn>
                    <TableRowColumn>
                      {(service.Endpoint.Ports || []).map((port, index) => (
                        <span key={index}>{port.Protocol} {port.PublishedPort}:{port.TargetPort}<br /></span>
                      ))}
                    </TableRowColumn>
                    <TableRowColumn>
                      <ServiceReplicaStatus
                        running={service.ReplicasRunning}
                        desired={service.Spec.Mode.Replicated.Replicas} />
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
));

export default Services;
