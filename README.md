# Swarmist

Experimental GUI and tools for Docker Swarm Mode

## How to Run

### Locally

	docker run -it -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 jsalonen/swarmist

### Against Remote Swarm

Create an SSH tunnel to manager node:

	ssh -NL localhost:2375:/var/run/docker.sock user@example.com

Start swarmist and connect to tunneled port:

	SWARMIST_DOCKER_URI=http://localhost:2375 npm start

### As a Swarm Mode Service

	docker service create \
      --name swarmist \
      --constraint node.role==manager \
      --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
      --publish 3000:3000 jsalonen/swarmist

## TODO

- [ ] Display connection error
