import db from './connection'
import { Task, TaskData } from '../../Models/Tasks'

export async function getAllTasks(): Promise<Task[]> {
  const todo = await db('task').select('*')
  return todo
}

export async function addTask(task: TaskData): Promise<Task> {
  const [newTask] = await db('task').insert(task).returning('*')
  return newTask
}

export function deleteTask(id: number) {
  return db('task').where('id', id).del()
}
