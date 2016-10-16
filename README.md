[![](https://images.microbadger.com/badges/image/jsalonen/swarmist.svg)](https://microbadger.com/images/jsalonen/swarmist "Get your own image badge on microbadger.com")
# Swarmist

Experimental GUI and tools for Docker Swarm Mode

## How to Run

### Locally

	docker run -it -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 jsalonen/swarmist

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
      --publish 3000:3000 jsalonen/swarmist

## TODO

- [X] Check connection and show errors (docker not connected, not in swarm)
- [ ] Support digest images / re-pull current image
- [ ] Support for service stats (tracking https://github.com/docker/docker/issues/24597)
- [ ] Support for service logs (tracking https://github.com/docker/docker/issues/24812)
- [ ] Recipe for using with traefik (tracking https://github.com/containous/traefik/pull/602#issuecomment-251024211)

Other pending swarm improvements: https://github.com/docker/docker/issues?utf8=%E2%9C%93&q=is%3Aopen%20label%3Aarea%2Fswarm%20label%3Akind%2Fenhancement

## Known Issues with Swarm Mode

- Service update with latest does not update image (https://github.com/docker/docker/issues/24066)
