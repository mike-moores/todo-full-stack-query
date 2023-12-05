import express from 'express'
import * as db from '../db/db'
import { TaskData } from '../../Models/Tasks'

const router = express.Router()

//  GET /api/v1/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks()
    res.json(tasks)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: `something went wrong in the task route:`,
    })
  }
})

// POST /api/v1/tasks
router.post('/', async (req, res) => {
  try {
    const taskData = req.body.newTask

    if (!taskData) {
      res.sendStatus(400)
      return
    }

    const newTask = await db.addTask(taskData as TaskData)
    res.json(newTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: `something went wrong in the task route:`,
    })
  }
})

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (!id) {
      res.sendStatus(400)
      return
    }

    await db.deleteTask(id)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router
