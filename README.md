# swarmist

Experimental GUI and tools for Docker Swarm Mode

## Running against remove swarm

Create SSH tunnel:

	ssh -NL localhost:2375:/var/run/docker.sock user@example.com

Start swarmist:

	npm start
