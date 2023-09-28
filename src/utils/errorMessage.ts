import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

const errorMessage = (err: unknown) => {
  const error = err as AxiosError
  if (typeof error.message !== 'string') {
    ;(error.message as []).forEach((err) => {
      toast.error(err)
    })
  } else {
    toast.error(error.message)
  }
}

export { errorMessage }
