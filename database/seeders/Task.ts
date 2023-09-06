import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Task from 'App/Models/Task'

export default class extends BaseSeeder {
  public async run() {
    const tasksData = [
      {
        title: 'Tarefa 1',
        description: 'Descrição da Tarefa 1',
      },
      {
        title: 'Tarefa 2',
        description: 'Descrição da Tarefa 2',
      },
      {
        title: 'Tarefa 3',
        description: 'Descrição da Tarefa 3',
      },
      {
        title: 'Tarefa 4',
        description: 'Descrição da Tarefa 4',
      },
    ]

    await Task.createMany(tasksData)
  }
}
