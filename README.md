# Swarmist

Experimental GUI and tools for Docker Swarm Mode

## Running Locally

	docker run -it -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 swarmist

## Running Against Remote Swarm

Create an SSH tunnel to manager node:

	ssh -NL localhost:2375:/var/run/docker.sock user@example.com

Start swarmist and connect to tunneled port:

	SWARMIST_DOCKER_URI=http://localhost:2375 npm start
