import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import Alert from '../components/Layout/Alert'
import List from '../components/List/List'
import useRequest from '../hooks/use-request'
import Movie from '../models/Movie'
import Helper from '../utils/Helper'

interface Props {
  movies: Movie[]
}

const HomePage: NextPage<Props> = props => {
  const [movies, setMovies] = useState<Movie[]>(props.movies)
  const router = useRouter()

  const { isLoading, sendRequest, error, setError } = useRequest()

  useEffect(() => {
    if (!props.movies || props.movies.length === 0) {
      setError({ isError: true, name: 'No movies in the database', message: '' })
    }
  }, [])

  /**
   * Request server for latest movies, updates movies state after request
   */
  const fetchMovies = async () => {
    await sendRequest(
      {
        url: `${process.env.NEXT_PUBLIC_API_BASE}`,
        error: 'Error in fetching movies from the server',
      },
      response => {
        const helper = new Helper()

        let movies = helper.transformMoviesIntoArray(response)
        setMovies(movies)
      }
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

export async function getServerSideProps() {
  let movies: Movie[] = []

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB.json`)
    const helper = new Helper()
    movies = helper.transformMoviesIntoArray(response)
  } catch (err: any) {
    console.error(`Error in fetching movie from the database: ${err.message && err.message}`)
  }

  return {
    props: { movies },
  }
}
