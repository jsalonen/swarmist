[![](https://images.microbadger.com/badges/image/jsalonen/swarmist.svg)](https://microbadger.com/images/jsalonen/swarmist "Get your own image badge on microbadger.com")

**Warning: This project is not actively maintained.** If you are looking for more up-to-date UI tools for managing your Docker Swarm cluster, consider using a more complete solution, like <a href="https://swarmpit.io" target="_blank">Swarmpit</a> or <a href="https://www.portainer.io/" target="_blank">Portainer</a>.

# Swarmist

Simple GUI for Docker Swarm Mode

![Screenshot](https://raw.githubusercontent.com/jsalonen/swarmist/master/screenshot.png)

## How to Run

### Locally

	docker run -it -v /var/run/docker.sock:/var/run/docker.sock -p 4000:4000 jsalonen/swarmist

### Against Remote Swarm

Create an SSH tunnel to manager node:

	ssh -NL localhost:2375:/var/run/docker.sock user@example.com

Start swarmist and connect to tunneled port:

	DOCKER_HOST=http://localhost:2375 npm start

### As a Swarm Mode Service

	docker service create \
      --name swarmist \
      --constraint node.role==manager \
      --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
      --publish 4000:4000 jsalonen/swarmist

## How to Develop

Install dependencies:

      npm install
      cd client && npm install && cd -

Run development server:

      npm start

Point your browser to:

      http://localhost:4000/

In order to see swarm statistics, you need to connect your UI to running swarm cluster.

## Testing Against Local Swarm Node

Simplest way to develop is to test against a local swarm node.

Ensure you have Docker installed locally:

      docker --version

Initiate swarm:

      docker swarm init

Test replicated services by deploying Voting App Example:

      cd ..
      git clone https://github.com/dockersamples/example-voting-app
      cd example-voting-app
      docker stack deploy --compose-file docker-stack.yml vote

Test global service by creating service in global mode (here: simple `top` monitor):

      docker service create --name top --mode global alpine top

## Testing Against Swarm Cluster in AWS

Probably the simplest way to test against AWS testnet is to deploy Docker for AWS Stack.

Navigate to https://docs.docker.com/docker-for-aws/ and deploy a stack with CloudFormation

Find out public address of any manager node and ssh into it:

      ssh -i [yourkeypair.pem] docker@1.2.12.123

Verify that docker is working and setup replicated services, for instance:

      docker --version
      docker service create --name top --mode global alpine top

Now tunnel remote docker socket to a local port:

      ssh -N -L 23750:/var/run/docker.sock docker@52.211.101.160

And finally start swarmist against this port as follows:

      DOCKER_HOST=localhost:23750 npm start

Information from remote swarm cluster should appear in the UI

## TODO

- [X] Check connection and show errors (docker not connected, not in swarm)
- [X] Support for service logs (tracking https://github.com/docker/docker/issues/24812)
- [ ] Display Service Events (https://github.com/docker/swarm/issues/1203)
- [ ] Display Service Volume mounts
- [ ] Display Service Contraints
- [ ] Support for service stats (tracking https://github.com/docker/docker/issues/24597)
- [ ] Support digest images / re-pull current image on update ((https://github.com/docker/docker/issues/24066)
- [ ] Add support for forced service update using --force option (https://github.com/docker/docker/pull/27596)

Other pending swarm improvements: https://github.com/docker/docker/issues?utf8=%E2%9C%93&q=is%3Aopen%20label%3Aarea%2Fswarm%20label%3Akind%2Fenhancement
