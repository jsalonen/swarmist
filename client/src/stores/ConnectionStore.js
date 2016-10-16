import {extendObservable, action} from 'mobx';

class ConnectionStore {
  constructor() {
    extendObservable(this, {
      ok: false,
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
            this.ok = false;
            return response.json().then((body) => {
              this.error = `Could not connect to Docker host at ${body.address} (${body.code})`;
              throw new Error('Connection error');
            });
          }
        })
        .then((info) => {
          if(info.Swarm.LocalNodeState !== 'active') {
            this.error = 'Connected to Docker; Swarm mode not active';
          } else if(!info.Swarm.ControlAvailable) {
            this.error = 'Connected to Swarm; Not running on manager node';
          } else {
            this.ok = true;
            this.error = null;
          }

          this.info = info;
        })
        .catch((error) => {
          this.ok = false;
        });
      })
    });
  }
}

export default ConnectionStore;
