import axios, { AxiosResponse } from 'axios'
import moment from 'moment'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import Form from '../../components/Form/Form'
import Alert from '../../components/Layout/Alert'
import useRequest from '../../hooks/use-request'
import Movie from '../../models/Movie'

interface Props {
  movie: Movie
  error: Error
}

const EditMoviePage: NextPage<Props> = props => {
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(props.movie)
  const router = useRouter()

  const { isLoading, sendRequest, error, setError } = useRequest()

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
    setMovieToEdit(null)
  }

  return (
    <Fragment>
      <Head>
        <title>{movieToEdit ? `Edit movie ${movieToEdit.name}` : 'Edit movie'}</title>
      </Head>
      {(error.isError || props.error) && (
        <Alert
          title={props.error.name || error.name}
          description={props.error.message || error.message}
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

export async function getServerSideProps(context: NextPageContext) {
  const movieId = context.query.movieId as string

  let data: Movie | undefined
  let formattedDate: string | undefined
  let error: Error | undefined
  try {
    const response: AxiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_FIREBASE_URL}/moviesDB/${movieId}.json`
    )
    data = response.data

    const date = new Date(data!.date)
    formattedDate = moment(date).format('YYYY-MM-DD')
  } catch (err: any) {
    console.error(`Error in fetching movie from the database: ${err.message && err.message}`)
    error = {
      name: 'Error in fetching movie from the database',
      message: `${err.message && err.message}`,
    }
  }

  return {
    props: { movie: { ...data, id: movieId, date: formattedDate } },
  }
}
