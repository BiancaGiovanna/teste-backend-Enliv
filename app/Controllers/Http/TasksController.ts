import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
  public async store({ request, response }: HttpContextContract) {
    try {
      // Crie um schema de validação
      const taskSchema = schema.create({
        title: schema.string({ trim: true }, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(255),
        ]),
        description: schema.string({ trim: true }, [
          rules.required(),
          rules.minLength(3),
          rules.maxLength(500),
        ]),
      })

      // Valide a solicitação usando o schema
      const body = await request.validate({
        schema: taskSchema,
        messages: {
          'title.required': 'O campo título é obrigatório.',
          'title.string': 'O campo título deve ser um texto.',
          'title.minLength': 'O numero minimo de caracteres é de 3.',
          'title.maxLength': 'O numero maximo de caracteres é de 255.',
          'description.required': 'O campo descrição é obrigatório.',
          'description.string': 'O campo descrição deve ser um texto.',
          'description.minLength': 'O numero minimo de caracteres é de 3.',
          'description.maxLength': 'O numero maximo de caracteres é de 500.',
        },
      })

      const task = await Task.create(body)

      response.status(201)
      return {
        message: 'Tarefa criada com sucesso',
        data: task,
      }
    } catch (error) {
      // Trate erros de validação
      response.status(400).json({
        message: 'Erro de validação',
        errors: error.messages,
      })
    }
  }
}
