import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { MovieError } from '..'
import Alert from '../components/Layout/Alert'
import List from '../components/List/List'
import Movie from '../models/Movie'

const HomePage: NextPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<MovieError>({ isError: false, name: '', message: '' })
  const router = useRouter()

  useEffect(() => {
    fetchMovies()
  }, [])

  /**
   * Request server for latest movies, updates movies state after request
   */
  const fetchMovies = async () => {
    setIsLoading(true)
    let response
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}`)
      const data: { value: Movie } = response.data

      let fetchedMovies: Movie[] = []
      for (let [key, value] of Object.entries(data)) {
        fetchedMovies.push({ ...value, id: key })
      }

      setMovies(fetchedMovies)
    } catch (err: any) {
      console.error(`Error in fetching the movies. ${err.message && err.message}`)
      setError({ isError: true, name: 'Error in fetching the movies', message: err.message })
    }
    setIsLoading(false)
  }

  /**
   * Requests the server to edit a movie
   * @param {string} id - The id of the movie
   */
  const handleMovieEdit = (id: string) => {
    router.push(`/edit/${id}`)
  }

  /**
   * Requests the server to delete a movie
   * @param {string} id - The id of the movie
   */
  const handleMovieDelete = async (id: string): Promise<any> => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE}/delete/${id}`).then(() => {
        fetchMovies()
      })
    } catch (err: any) {
      console.error(`Error in deleting the movie. ${err.message && err.message}`)
      setError({ isError: true, name: 'Error in deleting the movie', message: err.message })
    }
  }

  return isLoading ? (
    <Spinner ml='10%' mt='10%' size='xl' />
  ) : (
    <Fragment>
      {error.isError && (
        <Alert
          title={error.name}
          description={error.message}
          onCloseClick={() => {
            setError({ isError: false, name: '', message: '' })
          }}
        />
      )}
      <List movies={movies} onMovieEdit={handleMovieEdit} onMovieDelete={handleMovieDelete} />
    </Fragment>
  )
}

export default HomePage
