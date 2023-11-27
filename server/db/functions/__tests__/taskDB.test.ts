import * as db from '../../db.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../../connection'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllTasks', () => {
  it('should return all tasks', async () => {
    const tasks = await db.getAllTasks()
    expect(tasks).toHaveLength(3)
    expect(tasks[0]).toHaveProperty('id')
    expect(tasks[0]).toHaveProperty('details')
    expect(tasks[0]).toHaveProperty('priority')

    expect(tasks[0].id).toBe(1)
    expect(tasks[0].details).toBe('Walk dog')
    expect(tasks[0].priority).toBe('high')
  })

  afterAll(() => {
    connection.destroy()
  })
})
