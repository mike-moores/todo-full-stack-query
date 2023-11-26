// eslint-disable-next-line no-unused-vars
import { ChangeEvent, FormEvent, useState } from 'react'
import { TaskData } from '../../Models/Tasks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../apis/task'

const initialFormData = {
  details: '',
  completed: false,
}
function AddTodo() {
  const [form, setForm] = useState<TaskData>(initialFormData)
  const queryClient = useQueryClient()

  const taskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    taskMutation.mutate(form)
    setForm(initialFormData)
  }

  if (taskMutation.isLoading) {
    return <p>Adding Task</p>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task:</label>
        <input
          id="task"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleChange}
          name="details"
          value={form.details}
        />
      </form>
    </>
  )
}

export default AddTodo
