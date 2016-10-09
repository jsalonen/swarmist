var Docker = require('dockerode');
var url = require('url');
var dockerOpts = undefined;
if(process.env.SWARMIST_DOCKER_URI) {
  var url = url.parse(process.env.SWARMIST_DOCKER_URI);
  dockerOpts = {
    host: url.hostname || '127.0.0.1',
    port: url.port || 2375
  };
}
var docker = new Docker(dockerOpts);
var express = require('express');
var app = express();

app.get('/api', (req, res) => {
  res.send('API');
});

app.get('/api/containers', (req, res) => {
  docker.listContainers((err, containers) => {
    if(err) {
      return res.status(500).send(err);
    } else {
      return res.json(containers);
    }
  });
});

app.get('/api/services', (req, res) => {
  docker.listServices((err, services) => {
    if(err) {
      return res.status(500).send(err);
    } else {
      return res.json(services);
    }
  });
});

app.get('/api/services/:id', (req, res) => {
  var service = docker.getService(req.params.id);
  service.inspect((err, inspect) => {
    if(err) {
      return res.status(500).send(err);
    } else {
      return res.json(inspect);
    }
  });
});

app.get('/api/tasks', (req, res) => {
  docker.listTasks((err, tasks) => {
    if(err) {
      return res.status(500).send(err);
    } else {
      return res.json(tasks);
    }
  });
});

app.listen(3001, function () {
  console.log('Docker connection options:', dockerOpts);
  console.log('Server running');
});
