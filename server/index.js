var Docker = require('dockerode');
var url = require('url');
var dockerOpts = require('dockerode-options');
var options = dockerOpts(process.env.DOCKER_HOST);
var docker = new Docker(options);
var express = require('express');
var app = express();

app.get('/api/services', (req, res) => {
  docker.listTasks((err, tasks) => {
    if(err) {
      console.error(err);
      return res.status(500).send(err);
    } else {
      docker.listServices((err, services) => {
        if(err) {
          console.error(err);
          return res.status(500).send(err);
        } else {
          services.map((service) => {
            const replicasRunning = tasks.filter((task) => {
              return (task.ServiceID === service.ID) && (task.Status.State === 'running');
            }).length;

            service.ReplicasRunning = replicasRunning;
            return service;
          })

          return res.json(services);
        }
      });
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
  console.info('DOCKER_HOST parsed as: ', dockerOpts);
});
