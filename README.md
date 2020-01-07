[![](https://images.microbadger.com/badges/image/jsalonen/swarmist.svg)](https://microbadger.com/images/jsalonen/swarmist "Get your own image badge on microbadger.com")

**Warning: This project is not actively maintained.** If you are looking for more up-to-date UI tools for managing your Docker Swarm cluster, consider using a more complete solution, like [swarmpit.io](https://swarmpit.io/) or [portainer.io](https://www.portainer.io/).

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
