import { useState } from 'react'
import MovieError from '../models/MovieError'

const useError = () => {
  const [error, setError] = useState<MovieError>({
    isError: false,
    name: '',
    message: '',
  })

  const setMovieError = (error: MovieError) => {
    setError(error)
  }

  return { error, setMovieError }
}

export default useError
