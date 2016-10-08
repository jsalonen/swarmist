FROM node:slim

# Install packages
ADD package.json /src/package.json
RUN cd /src && npm install

ADD client/package.json /src/client/package.json
RUN cd /src/client && npm install

# Copy sources
ADD . /src
WORKDIR /src

EXPOSE 3000
CMD [ "npm", "start" ]
