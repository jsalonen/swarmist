set -e

# Build server
export GOOS=linux
export GOARCH=amd64
make

# Build client
cd client \
  && npm run build \
  && cd -

# Build docker
docker build . -t jsalonen/swarmist
