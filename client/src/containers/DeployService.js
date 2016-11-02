import React, { Component } from 'react';
import {observer} from 'mobx-react';
import Paper from 'material-ui/Paper';
import Breadcrumbs from '../components/Breadcrumbs';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  paper: {
    padding: 1 + 'rem'
  },
  title: {
    margin: 0
  }
};

import TextField from 'material-ui/TextField';

class ServiceForm extends Component {
  render () {
    const {name} = this.props;
    return (
      <form style={{maxWidth: 30 + 'rem'}}>
        <TextField
          floatingLabelText="Service Name"
          fullWidth={true}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Image"
          fullWidth={true}
          floatingLabelFixed={true}
        />
        <TextField
          floatingLabelText="Published Ports"
          fullWidth={true}
          floatingLabelFixed={true}
        />
        {this.props.children}
      </form>
    )
  }
}

const DeployService = observer(
  class DeployService extends Component {
    render() {
      return (
         <div>
           <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
           <Paper style={style.paper} zDepth={3}>
             <h3 style={style.title}>Create Service</h3>
             <ServiceForm name="Name">
              <div style={{marginTop: 2 + 'rem'}}>
                <RaisedButton
                  label="Create"
                  primary={true}
                  icon={<i className="material-icons" style={{color: '#fff'}}>add</i>}
                />
              </div>
             </ServiceForm>
           </Paper>
         </div>
      );
    }
  }
);

export default DeployService;
