import { Spinner } from '@chakra-ui/react'
import { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { RequestConfig, ResponseType } from '..'
import Alert from '../components/Layout/Alert'
import List from '../components/List/List'
import useRequest from '../hooks/use-request'
import Movie from '../models/Movie'

const HomePage: NextPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const router = useRouter()

  const { isLoading, sendRequest, error, setError } = useRequest()

  useEffect(() => {
    fetchMovies()
  }, [])

  /**
   * Transforms response from server into array and sets it into state
   * @param {AxiosResponse<any, RequestConfig>} response: response from the server
   */
  const transformMoviesForState = (response: AxiosResponse<any, RequestConfig>) => {
    const data: ResponseType = response.data

    let fetchedMovies: Movie[] = []
    for (let [key, value] of Object.entries(data)) {
      fetchedMovies.push({ ...value, id: key })
    }

    setMovies(fetchedMovies)
  }

  /**
   * Request server for latest movies, updates movies state after request
   */
  const fetchMovies = async () => {
    await sendRequest(
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
  const handleMovieDelete = async (id: string) => {
    await sendRequest({
      url: `${process.env.NEXT_PUBLIC_API_BASE}/delete/${id}`,
      method: 'DELETE',
      error: 'Error in deleting the movie at server',
    }).then(() => {
      fetchMovies()
    })
  }

  return isLoading ? (
    <Spinner ml='10%' mt='10%' size='xl' />
  ) : (
    <Fragment>
      {error?.isError && (
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
