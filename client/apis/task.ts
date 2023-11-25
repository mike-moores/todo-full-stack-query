import request from 'superagent'
import { Task, TaskData } from '../../Models/Tasks'

export async function getAllTasks(): Promise<Task[]> {
  const response = await request.get('/api/v1/tasks')
  return response.body.tasks
}

export async function addTask(task: TaskData): Promise<Task> {
  const response = await request.post('/api/v1/tasks').send({ newTask: task })
  return response.body.newtask
}

export async function deleteTask(id: number): Promise<void> {
  await request.delete(`/api/v1/tasks/${id}`)
}
