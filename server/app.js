const Docker = require('dockerode');
const dockerOpts = require('dockerode-options');
const options = dockerOpts(process.env.DOCKER_HOST);
const docker = new Docker(options);
const express = require('express');
const app = express();

app.use('/', express.static('client/build'));

app.get('/api/info', (req, res) => {
  docker.info((err, info) => {
    if (err) {
      return res.status(503).json(err);
    } else {
      return res.json(info);
    }
  });
});

app.get('/api/services', (req, res) => {
  docker.listTasks((err, tasks) => {
    if (err) {
      console.error(err);
      return res.status(503).json(err);
    } else {
      docker.listServices((err, services) => {
        if (err) {
          console.error(err);
          return res.status(503).send(err);
        } else {
          services.map(service => {
            const replicasRunning = tasks.filter(task => {
              return (
                task.ServiceID === service.ID && task.Status.State === 'running'
              );
            }).length;

            service.ReplicasRunning = replicasRunning;
            return service;
          });

          return res.json(services);
        }
      });
    }
  });
});

app.get('/api/services/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400);
  } else {
    const service = docker.getService(id);

    service.inspect((err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json(data);
      }
    });
  }
});

app.get('/api/services/:id/logs', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400);
  } else {
    const service = docker.getService(id);
    const opts = {
      stdout: 1,
      stderr: 1,
      follow: 0,
      timestamps: 1,
      tail: 100
      //since: [UNIX timestamp]
    };

    function demux(buffer) {
      const items = [];
      let i = 0;

      while (i < buffer.length) {
        const type = buffer.readUInt8(i);
        i += 4;
        const payloadSize = buffer.readUInt32BE(i);
        i += 4;
        const payload = buffer.slice(i, i + payloadSize).toString();
        i += payloadSize;

        items.push([type === 2 ? 'stderr' : 'stdout', payload]);
      }

      return items;
    }

    function orderByTimestamp(items) {
      const itemsWithTimestamp = items.map(([type, payload]) => {
        const [timestamp, logline] = payload.split(/ (.+)?/, 2);
        return [type, logline, timestamp];
      });
      return itemsWithTimestamp.sort((a, b) => {
        return a[2].localeCompare(b[2]);
      });
    }

    service.logs(opts, (err, stream) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        var chunks = [];
        stream.on('data', function(chunk) {
          chunks.push(chunk);
        });
        stream.on('end', function() {
          var buffer = Buffer.concat(chunks);
          return res.status(200).send(orderByTimestamp(demux(buffer)));
        });
      }
    });
  }
});

app.get('/api/tasks', (req, res) => {
  docker.listTasks((err, tasks) => {
    if (err) {
      console.error(err);
      return res.status(503).json(err);
    } else {
      return res.json(tasks);
    }
  });
});

app.get('/api/networks', (req, res) => {
  docker.listNetworks((err, networks) => {
    if (err) {
      console.error(err);
      return res.status(503).json(err);
    } else {
      return res.json(networks);
    }
  });
});

module.exports = app;
