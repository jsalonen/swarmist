import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IdField from './IdField';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
    fetch('/api/services/', {
      accept: 'application/json'
    })
      .then((response) => {
        return response.json();
      })
      .then((services) => {
        this.setState({
          services: services
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onRowSelection(rows) {
    this.props.onSelection(rows.map((index) => {
      return this.state.services[index].ID;
    }));
  }

  render() {
    var services;
    if(!this.state.services || !this.state.services.length) {
      services = <p/>
    } else {
      services =
        <div>
          <Subheader>Services</Subheader>
          <Table selectable={true}
           multiSelectable={false}
           onRowSelection={this.onRowSelection.bind(this)}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Image</TableHeaderColumn>
                <TableHeaderColumn>Ports</TableHeaderColumn>
                <TableHeaderColumn>Replicas</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.services.map((service, index) => (
                <TableRow key={index} selected={this.props.selectedServices.indexOf(service.ID) !== -1}>
                  <TableRowColumn>
                    {service.Spec.Name} (<IdField value={service.ID}></IdField>)
                  </TableRowColumn>
                  <TableRowColumn>{service.Spec.TaskTemplate.ContainerSpec.Image}</TableRowColumn>
                  <TableRowColumn>
                    {service.Endpoint.Ports.map((port, index) => (
                      <span key={index}>{port.Protocol} {port.PublishedPort}:{port.TargetPort}<br /></span>
                    ))}
                  </TableRowColumn>
                  <TableRowColumn>{service.Spec.Mode.Replicated.Replicas}</TableRowColumn>
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
