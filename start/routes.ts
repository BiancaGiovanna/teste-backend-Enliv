import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.resource('/tasks', 'TasksController').apiOnly()
  Route.put('tasks/:id/update-status', 'TasksController.updateStatus')
}).prefix('/api')
