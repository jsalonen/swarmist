package main

import (
	"context"
	"fmt"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/swarm"
	"github.com/docker/docker/client"
	"github.com/kataras/iris"
	"github.com/iris-contrib/middleware/cors"
)

type SwarmistService struct {
	swarm.Service
	ReplicasRunning int
}

func main() {
	cli, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}

	iris.Use(cors.Default())

	iris.Get("/", func(ctx *iris.Context) {
		requestpath := "client/build/index.html"
		ctx.ServeFile(requestpath, true)
	})

	iris.Get("/static/*file", func(ctx *iris.Context) {
		requestpath := "client/build/static" + ctx.Param("file")
		ctx.ServeFile(requestpath, true)
	})

	iris.Get("/api/info", func(ctx *iris.Context) {
		info, err := cli.Info(context.Background())
		if err != nil {
			fmt.Println(err)
			ctx.EmitError(iris.StatusInternalServerError)
			return
		}

		ctx.JSON(iris.StatusOK, info)
	})

	iris.Get("/api/services", func(ctx *iris.Context) {
		services, err := cli.ServiceList(context.Background(), types.ServiceListOptions{})
		if err != nil {
			fmt.Println(err)
			ctx.EmitError(iris.StatusInternalServerError)
			return
		}

		tasks, err := cli.TaskList(context.Background(), types.TaskListOptions{})
		if err != nil {
			fmt.Println(err)
			ctx.EmitError(iris.StatusInternalServerError)
			return
		}

		swarmistServices := make([]SwarmistService, len(services))
		for i, service := range services {
			swarmistService := SwarmistService{service, 0}

			replicasRunning := 0
			for _, task := range tasks {
				if task.ServiceID == service.ID && task.Status.State == "running" {
					replicasRunning++
				}
			}
			swarmistService.ReplicasRunning = replicasRunning
			swarmistServices[i] = swarmistService
		}

		ctx.JSON(iris.StatusOK, swarmistServices)
	})

	iris.Get("/api/tasks", func(ctx *iris.Context) {
		tasks, err := cli.TaskList(context.Background(), types.TaskListOptions{})
		if err != nil {
			ctx.EmitError(iris.StatusInternalServerError)
			return
		}

		ctx.JSON(iris.StatusOK, tasks)
	})

	listenTo := ":3000"
	if os.Getenv("PORT") != "" {
		listenTo = ":" + os.Getenv("PORT")
	}
	iris.Listen(listenTo)
}
