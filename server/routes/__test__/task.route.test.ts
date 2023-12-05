import { expect, it, vi, describe } from 'vitest'
import request from 'supertest'
import server from '../../server'
import { getAllTasks } from '../../db/db'

vi.mock('../../db/db.ts')

describe('/', () => {
  it('calls getAllTasks', async () => {
    vi.mocked(getAllTasks).mockImplementation(async () => {
      return [
        {
          id: 1,
          details: 'Walk dog',
          priority: 'high',
          completed: false,
        },
        {
          id: 2,
          details: 'Clean car',
          priority: 'low',
          completed: false,
        },
        {
          id: 3,
          details: 'Sleep',
          priority: 'medium',
          completed: false,
        },
      ]
    })
    const res = await request(server).get('/api/v1/tasks')
    expect(res.statusCode).toBe(200)
    expect(getAllTasks).toHaveBeenCalled()
  })

  it('should return an error message when the db fails', async () => {
    vi.mocked(getAllTasks).mockRejectedValue(
      new Error('SQLITE ERROR: db broke')
    )

    vi.spyOn(console, 'error').mockImplementation(() => {})

    const response = await request(server).get('/api/v1/tasks')

    expect(response.body.error).toBe(`something went wrong in the Task route:`)
    expect(console.error).toHaveBeenCalledWith(
      new Error('SQLITE ERROR: db broke')
    )

    expect(response.body.error).not.toBe('SQLITE ERROR: db broke')
    expect(response.statusCode).toBe(500)
  })
})
