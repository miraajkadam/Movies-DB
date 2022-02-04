import { useState } from 'react'
import MovieError from '../models/MovieError'

const useError = () => {
  const [error, setError] = useState<MovieError>()

  const setMovieError = (error: MovieError) => {
    setError(error)
  }

  console.log(error)
  return { error, setMovieError }
}

export default useError
