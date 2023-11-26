import AddTodo from './AddTodo.tsx'
import TaskList from './Tasks.tsx'

function App() {
  return (
    <>
      <header className="header">
        <AddTodo />
      </header>
      <section className="main"></section>
      <TaskList />
      <footer className="footer"></footer>
    </>
  )
}

export default App
