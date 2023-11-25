import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../apis/task'

interface Props {
  id: number
}

export function DeleteButton(props: Props) {
  const queryClient = useQueryClient()

  const mustation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  function handleClick() {
    mustation.mutate(props.id)
  }

  return (
    <>
      <button className="destroy" onClick={handleClick}>
        X
      </button>
    </>
  )
}