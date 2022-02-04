import axios from 'axios'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import Form from '../../components/Form/Form'
import Alert from '../../components/Layout/Alert'
import Movie from '../../models/Movie'
import MovieError from '../../models/MovieError'

const EditMoviePage = () => {
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<MovieError>({ isError: false, name: '', message: '' })

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    fetchMovieToEdit()
  }, [router.isReady])

  const fetchMovieToEdit = async () => {
    const { movieId } = router.query

    setIsLoading(true)

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/get/${movieId}`)
      const { data } = response

      const date = new Date(data.date)
      const formattedDate = moment(date).format('YYYY-MM-DD')

      setMovieToEdit({ ...data, date: formattedDate, id: movieId })
    } catch (err: any) {
      console.error(`Error in fetching the editable movie. ${err && err}`)
      setError({
        isError: true,
        name: 'Error in fetching the editable movie',
        message: err.message,
      })
    }

    setIsLoading(false)
  }

  const handleEditableMovieSubmit = async (movie: Movie) => {
    setIsLoading(true)

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_BASE}/edit/${movie.id}`, movie).then(() => {
        router.push('/')
      })
    } catch (err: any) {
      console.error(`Error in updating movie. ${err.message && err.message}`)
    }

    setIsLoading(false)
  }

  return (
    <Fragment>
      <Head>
        <title>{movieToEdit ? `Edit movie ${movieToEdit.name}` : 'Edit movie'}</title>
      </Head>
      {error.isError && (
        <Alert
          title={error.name}
          description={error.message}
          onCloseClick={() => {
            setError({ isError: false, name: '', message: '' })
          }}
        />
      )}
      <Form
        editableData={movieToEdit}
        onFormSubmit={handleEditableMovieSubmit}
        isLoading={isLoading}
      />
    </Fragment>
  )
}

export default EditMoviePage
