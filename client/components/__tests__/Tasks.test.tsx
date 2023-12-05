//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderApp } from '../../test/setup'
import nock from 'nock'
import { waitForElementToBeRemoved } from '@testing-library/react/pure'

const scope = nock('http://localhost').get('/api/v1/tasks')

const mockTasks = [
  {
    id: 30,
    details: 'Vacuum Cat',
    priority: 'Low',
    completed: false,
  },
  {
    id: 32,
    details: 'Mow the lawns',
    priority: 'Low',
    completed: false,
  },
]

describe('Tasks', () => {
  it('should render loading message', async () => {
    // ... (previous code)
  })

  it('should render tasks ', async () => {
    const scope = nock('http://localhost:3000')
      .get('/api/v1/tasks')
      .reply(200, mockTasks)

    const screen = renderApp('/')

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    const tasks = screen.getAllByRole('listitem')
    expect(tasks[0]).toHaveTextContent('Vacuum Cat')
    expect(tasks[1]).toHaveTextContent('Mow the lawns')

    expect(scope.isDone()).toBe(true)
  })

  it('should render error message', async () => {
    const scope = nock('http://localhost:3000').get('/api/v1/tasks').reply(500)

    const screen = renderApp('/')

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))

    const error = screen.getByText('Error while loading tasks')

    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
