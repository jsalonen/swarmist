import {extendObservable, action} from 'mobx';

class NodeStore {
  constructor() {
    extendObservable(this, {
      connected: false,
      error: false,
      polling: false,
      info: {},
      tasks: [],
      services: [],

      inSwarm: () => {
        return(this.info && this.info.Swarm && this.info.Swarm.LocalNodeState === 'active');
      },

      connect: action(() => {
        fetch('/api/docker/info', {
          accept: 'application/json'
        })
        .then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            this.connected = false;
            this.error = `Could not connect to Docker`;
            return response.json().then((body) => {
              this.error = `Could not connect to Docker at ${body.address} (${body.code})`;
              throw new Error('Connection error');
            });
          }
        })
        .then((info) => {
          this.connected = true;
          this.info = info;

          if(info.Swarm.LocalNodeState !== 'active') {
            this.error = 'This node is not running on a swarm.';
          } else if(!info.Swarm.ControlAvailable) {
            this.error = 'This node is not running as a swarm manager.';
          } else {
            this.error = null;
          }
        })
        .catch((error) => {
          this.connected = false;
        });
      }),

      getServices: action(() => {
        fetch('/api/services/', {
          accept: 'application/json'
        })
        .then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .then((services) => {
          this.services = services;
        })
        .catch((error) => {
          this.error = 'Error retrieving services';
        });
      }),

      getTasks: action(() => {
        fetch('/api/tasks', {
          accept: 'application/json'
        })
        .then((response) => {
          if(response.ok) {
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .then((tasks) => {
          tasks.sort((a, b) => {
            if(a.UpdatedAt > b.UpdatedAt) {
              return -1;
            }
            if(a.UpdatedAt < b.UpdatedAt) {
              return 1;
            }
            return 0;
          });

          this.tasks = tasks.filter((task) => 
            task.DesiredState !== 'shutdown' || task.Status.State !== 'shutdown'
          );
        })
        .catch((error) => {
          this.error = 'Error retrieving tasks';
        });
      })
    });
  }
}

export default NodeStore;
