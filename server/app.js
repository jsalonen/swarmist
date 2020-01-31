const Docker = require('dockerode');
const dockerOpts = require('dockerode-options');
const options = dockerOpts(process.env.DOCKER_HOST);
const docker = new Docker(options);
const express = require('express');
const stream = require('stream');
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
      stdout: true,
      stderr: true,
      follow: true,
      timestamps: true,
      tail: 100
      //since: [UNIX timestamp]
    };

    function orderByTimestamp(items) {
      const itemsWithTimestamp = items.map(([type, payload]) => {
        const [timestamp, logline] = payload.split(/ (.+)?/, 2);
        return [type, logline, timestamp];
      });
      return itemsWithTimestamp.sort((a, b) => {
        return a[2].localeCompare(b[2]);
      });
    }

    const stdoutStream = new stream.PassThrough();
    const stderrStream = new stream.PassThrough();
    let rows = []; 
    stdoutStream.on('data', function(chunk) {
      rows.push([
        'stdout',
        chunk.toString('utf8')
      ]);
    });
    stderrStream.on('data', function(chunk) {
      rows.push([
        'stderr',
        chunk.toString('utf8')
      ]);
    });

    service.logs(opts, (err, stream) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        service.modem.demuxStream(stream, stdoutStream, stderrStream);
        stream.on('end', function() {
          stdoutStream.end('!stop!');
          stderrStream.end('!stop!');
          res.status(200).send(orderByTimestamp(rows));
        });

        setTimeout(function() {
          stream.destroy();
        }, 2000);
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
