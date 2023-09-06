import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { Exception } from '@adonisjs/core/build/standalone'

export default class TasksController {
  //Insert
  public async store({ request, response }: HttpContextContract) {
    try {
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

      const body = await request.validate({
        schema: taskSchema,
        messages: {
          'title.required': 'O campo título é obrigatório.',
          'title.string': 'O campo título deve ser um texto.',
          'title.minLength': 'O título deve ter pelo menos 3 caracteres.',
          'title.maxLength': 'O título não pode exceder 255 caracteres.',
          'description.required': 'O campo descrição é obrigatório.',
          'description.string': 'O campo descrição deve ser um texto.',
          'description.minLength': 'A descrição deve ter pelo menos 3 caracteres.',
          'description.maxLength': 'A descrição não pode exceder 500 caracteres.',
        },
      })

      const task = await Task.create(body)

      response.status(201)
      return {
        message: 'Tarefa criada com sucesso',
        data: task,
      }
    } catch (error) {
      if (error instanceof Exception && error.message) {
        response.status(400).json({
          message: 'Erro de validação',
          errors: error.message,
        })
      } else {
        console.error(error)
        response.status(500).json({
          message: 'Erro interno do servidor',
        })
      }
    }
  }
  //Find All
  public async index() {
    const tasks = await Task.all()

    return {
      data: tasks,
    }
  }
  //Find by id
  public async show({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    return {
      data: task,
    }
  }
  //Delete
  public async destroy({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
    return {
      message: 'Tarefa excluida com sucesso',
      data: task,
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const taskUpdateSchema = schema.create({
        title: schema.string.optional({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
        description: schema.string.optional({ trim: true }, [
          rules.minLength(3),
          rules.maxLength(500),
        ]),
      })

      const body = await request.validate({
        schema: taskUpdateSchema,
        messages: {
          'title.minLength': 'O título deve ter pelo menos 3 caracteres.',
          'title.maxLength': 'O título não pode exceder 255 caracteres.',
          'description.minLength': 'A descrição deve ter pelo menos 3 caracteres.',
          'description.maxLength': 'A descrição não pode exceder 500 caracteres.',
        },
      })

      const task = await Task.findOrFail(params.id)

      if (body.title) {
        task.title = body.title
      }

      if (body.description) {
        task.description = body.description
      }

      await task.save()

      return {
        message: 'Tarefa atualizada com sucesso!',
        data: task,
      }
    } catch (error) {
      if (error.messages) {
        return response.status(400).json({
          message: 'Erro de validação',
          errors: error.messages,
        })
      } else if (error.name === 'ModelNotFoundException') {
        return response.status(404).json({
          message: 'Tarefa não encontrada',
        })
      } else {
        console.error(error)
        return response.status(500).json({
          message: 'Erro interno do servidor',
        })
      }
    }
  }

  public async updateStatus({ request, response, params }: HttpContextContract) {
    try {
      const taskId = params.id
      const newStatus = request.input('status')
      const task = await Task.findOrFail(taskId)
      task.status = newStatus
      await task.save()

      return {
        message: 'Status da tarefa atualizado com sucesso',
        data: task,
      }
    } catch (error) {
      console.error(error)
      response.status(500).json({
        message: 'Erro interno do servidor',
      })
    }
  }
}
