import { AxiosResponse } from 'axios'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { ResponseType } from '../..'
import Form from '../../components/Form/Form'
import Alert from '../../components/Layout/Alert'
import useRequest from '../../hooks/use-request'
import Movie from '../../models/Movie'

const EditMoviePage = () => {
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null)
  const router = useRouter()

  const { isLoading, sendRequest, error, setError } = useRequest()

  useEffect(() => {
    if (!router.isReady) return

    fetchMovieToEdit()
  }, [router.isReady])

  const fetchMovieToEdit = async () => {
    const movieId = router.query.movieId as string

    await sendRequest(
      {
        url: `${process.env.NEXT_PUBLIC_API_BASE}/get/${movieId}`,
        error: 'Failed to fetch movie from the server',
      },
      (response: AxiosResponse<any, { url?: string; error: string }>) => {
        const data: ResponseType<Movie> = response.data

        const date = new Date(data.date)
        const formattedDate = moment(date).format('YYYY-MM-DD')

        setMovieToEdit({ ...data, date: formattedDate, id: movieId })
      }
    )
  }

  const handleEditableMovieSubmit = async (movie: Movie) => {
    await sendRequest(
      {
        url: `${process.env.NEXT_PUBLIC_API_BASE}/edit/${movie.id}`,
        method: 'PATCH',
        body: movie,
        error: 'Failed to patch the movie to the server',
      },
      response => {
        if (response && response.status === 200) router.push('/')
      }
    )
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
