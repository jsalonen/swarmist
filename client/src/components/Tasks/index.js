import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Subheader from "material-ui/Subheader";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import IdField from "../IdField";

const Tasks = inject("nodeStore")(
  observer(
    class Tasks extends Component {
      render() {
        const { nodeStore } = this.props;

        if (
          !nodeStore.tasks ||
          !nodeStore.tasks ||
          !nodeStore.selectedServices.length
        ) {
          return <div />;
        } else {
          const filteredTasks = nodeStore.tasks.filter(
            task => nodeStore.selectedServices.indexOf(task.ServiceID) !== -1
          );

          return (
            <div>
              <hr />
              <Subheader>Tasks</Subheader>
              <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Image</TableHeaderColumn>
                    <TableHeaderColumn>Desired state</TableHeaderColumn>
                    <TableHeaderColumn>Current state</TableHeaderColumn>
                    <TableHeaderColumn>Error</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {filteredTasks.map((task, index) => (
                    <TableRow key={index}>
                      <TableRowColumn>
                        <IdField value={task.ID} />
                      </TableRowColumn>
                      <TableRowColumn>
                        {task.Spec.ContainerSpec.Image}
                      </TableRowColumn>
                      <TableRowColumn>{task.DesiredState}</TableRowColumn>
                      <TableRowColumn>{task.Status.State}</TableRowColumn>
                      <TableRowColumn>{task.Status.Err}</TableRowColumn>
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

export default Tasks;
