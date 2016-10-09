import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IdField from './IdField';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  loadTasks() {
    fetch('/api/tasks', {
      accept: 'application/json'
    })
      .then((response) => {
        return response.json();
      })
      .then((tasks) => {
        this.setState({
          tasks: tasks
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.loadTasks();
    setInterval(this.loadTasks.bind(this), 1000);
  }

  render() {
    var tasks;
    if(!this.state.tasks || !this.state.tasks.length) {
      tasks = <p/>
    } else {
      tasks =
        <div>
          <Subheader>Tasks</Subheader>
          <Table selectable={false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Image</TableHeaderColumn>
                <TableHeaderColumn>Message</TableHeaderColumn>
                <TableHeaderColumn>State</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableRowColumn><IdField value={task.ID}></IdField></TableRowColumn>
                  <TableRowColumn>{task.Spec.ContainerSpec.Image}</TableRowColumn>
                  <TableRowColumn>{task.Status.Message}</TableRowColumn>
                  <TableRowColumn>{task.Status.State}<br/>{task.Status.Err}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    }

    return (
      <div className='tasks'>
        {tasks}
      </div>
    );
  }
}

export default Tasks;

