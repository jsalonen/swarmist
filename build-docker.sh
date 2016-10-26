set -e

# Build server
GOOS=linux GOARCH=amd64 go build -o server/build/main server/main.go

# Build client
cd client \
  && npm run build \
  && cd -

# Build docker
docker build . -t jsalonen/swarmist
