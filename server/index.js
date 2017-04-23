var Docker = require("dockerode");
var url = require("url");
var dockerOpts = require("dockerode-options");
var options = dockerOpts(process.env.DOCKER_HOST);
var docker = new Docker(options);
var express = require("express");
var app = express();

app.use("/", express.static("client/build"));

app.get("/api/info", (req, res) => {
  docker.info((err, info) => {
    if (err) {
      return res.status(503).json(err);
    } else {
      return res.json(info);
    }
  });
});

app.get("/api/services", (req, res) => {
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
                task.ServiceID === service.ID && task.Status.State === "running"
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

app.get("/api/services/:id", (req, res) => {
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

app.get("/api/services/:id/logs", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400);
  } else {
    let service = docker.getService(id);

    function getServiceLogs(service, callback) {
      var self = service;

      var optsf = {
        path: "/services/" + service.id + "/logs?",
        method: "GET",
        statusCodes: {
          200: true,
          404: "no such service",
          500: "server error"
        },
        options: {
          stdout: 1,
          stderr: 1,
          follow: 0
          //tail: 25
          //timestamps: 1,
          //since: [UNIX timestamp]
        }
      };

      service.modem.dial(optsf, function(err, data) {
        callback(err, data);
      });
    }

    getServiceLogs(service, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        // Replace SOH control characters (0x01) with newlines
        const nlData = data.replace(/\x01/g, "\n");
        return res.status(200).send(data);
        /*

        for(let i = 0; i < data.length - 1; ++i) {
          if(data.charCodeAt(i) === 2) {
            const header = data.substring(i, i+8);
            const headerCodes = [];
            for(let j = 0; j < header.length; j++) {
              const code = header.charCodeAt(j);
              headerCodes.push(code);
            }
            console.log('header=', headerCodes);
          }
        }

        const nlData = data.replace(/[\x00\x01\x02]/g, "\n");
        return res.status(200).send(data);//data);
        */
      }
    });
  }
});
app.get("/api/tasks", (req, res) => {
  docker.listTasks((err, tasks) => {
    if (err) {
      console.error(err);
      return res.status(503).json(err);
    } else {
      return res.json(tasks);
    }
  });
});

app.listen(process.env.PORT || 4000, function() {
  console.info("DOCKER_HOST parsed as: ", options);
});
