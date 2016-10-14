FROM mhart/alpine-node

# Build server
COPY package.json /src/package.json
RUN cd /src && npm install --production
COPY server /src/server

# Build client
COPY client /src/client
RUN cd /src/client && npm install && npm run build \
    && rm -rf /src/client/node_modules

# Workdir
WORKDIR /src

EXPOSE 3000
CMD [ "node", "server/index.js" ]
