import { useQuery } from '@tanstack/react-query'
import { getAllTasks } from '../apis/task.ts'
import { DeleteButton } from './Delete.tsx'

function TaskList() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({ queryKey: ['tasks'], queryFn: () => getAllTasks() })

  if (error) {
    return <p>Error while loading tasks</p>
  }

  if (isLoading || !tasks) {
    return <p>Loading...</p>
  }

  


  return (
    <>
      <header className="header">
        <h1>Task List</h1>
      </header>
      <ul>{tasks.map((t,i) => (<li key={i}>{t.details} hello </li>))}</ul>
      <section className="main">
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index} className="completed">
              <p>{task.details}</p>
              <div key={task.id}>
                <DeleteButton id={task.id} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default TaskList
