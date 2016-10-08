# Swarmist

Experimental GUI and tools for Docker Swarm Mode

## Running Against Remote Swarm

Create an SSH tunnel to manager node:

	ssh -NL localhost:2375:/var/run/docker.sock user@example.com

Start swarmist:

	npm start
