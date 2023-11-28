import { Route, createRoutesFromElements } from 'react-router-dom'
import App from './components/App'
import AddTodo from './components/AddTodo'
import TaskList from './components/Tasks'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* http://localhost:5137 */}
    <Route index element={<AddTodo />} />

    <Route path="/tasks" element={<TaskList />} />
  </Route>
)
