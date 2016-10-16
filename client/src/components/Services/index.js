import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IdField from '../IdField';
import ServiceUpdateStatus from '../ServiceUpdateStatus';
import ServiceReplicaStatus from '../ServiceReplicaStatus';

class Services extends Component {
  onRowSelection(rows) {
    this.props.onSelection(rows.map((index) => {
      return this.props.services[index].ID;
    }));
  }

  render() {
    let services;

    if(!this.props.services || !this.props.services.length) {
      services = 
        <div>
          <Subheader>No services</Subheader>
        </div>
    } else {
      services =
        <div>
          <Subheader>Services</Subheader>
          <Table selectable={true}
           multiSelectable={false}
           onRowSelection={this.onRowSelection.bind(this)}>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Image</TableHeaderColumn>
                <TableHeaderColumn>Ports</TableHeaderColumn>
                <TableHeaderColumn>Replicas</TableHeaderColumn>
                <TableHeaderColumn>Update status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.services.map((service, index) => (
                <TableRow key={index} selected={this.props.selectedServices.indexOf(service.ID) !== -1}>
                  <TableRowColumn>
                    {service.Spec.Name} (<IdField value={service.ID}></IdField>)
                  </TableRowColumn>
                  <TableRowColumn>{service.Spec.TaskTemplate.ContainerSpec.Image}</TableRowColumn>
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
                  <TableRowColumn>
                    <ServiceUpdateStatus state={service.UpdateStatus.State} />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    }

    return (
      <div className='services'>
        {services}
      </div>
    );
  }
}

export default Services;
