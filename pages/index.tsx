import { Spinner } from '@chakra-ui/react'
import { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import Alert from '../components/Layout/Alert'
import List from '../components/List/List'
import useError from '../hooks/use-error'
import useRequest from '../hooks/use-request'
import Movie from '../models/Movie'

const HomePage: NextPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])

  const { isLoading, sendRequest } = useRequest()
  const { error, setMovieError } = useError()

  const router = useRouter()

  const transformMoviesForState = (data: AxiosResponse<{ firebaseKey: { movie: Movie } }>) => {
    let fetchedMovies: Movie[] = []
    for (let [key, value] of Object.entries(data)) {
      fetchedMovies.push({ ...value, id: key })
    }

    setMovies(fetchedMovies)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  /**
   * Request server for latest movies, updates movies state after request
   */
  const fetchMovies = async () => {
    sendRequest(
      {
        url: `${process.env.NEXT_PUBLIC_API_BASE}`,
        error: 'Error in fetching movies from the server',
      },
      transformMoviesForState
    )
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
  const handleMovieDelete = (id: string) => {
    sendRequest({
      url: `${process.env.NEXT_PUBLIC_API_BASE}/delete/${id}`,
      method: 'DELETE',
      error: 'Error in deleting the movie at server',
    }).then(() => {
      fetchMovies()
    })
  }

  // console.log(error)
  return isLoading ? (
    <Spinner ml='10%' mt='10%' size='xl' />
  ) : (
    <Fragment>
      {error?.isError && (
        <Alert
          title={error.name}
          description={error.message}
          onCloseClick={() => {
            setMovieError({ isError: false, name: '', message: '' })
          }}
        />
      )}
      <List movies={movies} onMovieEdit={handleMovieEdit} onMovieDelete={handleMovieDelete} />
    </Fragment>
  )
}

export default HomePage
