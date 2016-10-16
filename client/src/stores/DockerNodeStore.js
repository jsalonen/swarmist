import {extendObservable, action} from 'mobx';

class DockerNodeStore {
  constructor() {
    extendObservable(this, {
      connected: false,
      error: false,
      info: {},

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
      })
    });
  }
}

export default DockerNodeStore;
