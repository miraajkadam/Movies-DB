import axios from 'axios'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import Form from '../../components/Form/Form'
import Movie from '../../model/Movie'

const EditMoviePage = () => {
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    fetchMovieToEdit()
  }, [router.isReady])

  const fetchMovieToEdit = async () => {
    const { movieId } = router.query

    setIsLoading(true)

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/${movieId}`)
      const { data } = response

      const date = new Date(data.date)
      const formattedDate = moment(date).format('YYYY-MM-DD')

      setMovieToEdit({ ...data, date: formattedDate })
    } catch (err: any) {
      console.error(`Error in fetching the editable movie. ${err && err}`)
    }

    setIsLoading(false)
  }

  const handleEditableMovieSubmit = async (movie: Movie) => {
    setIsLoading(true)

    try {
      await axios
        .patch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/${movie.id}`, movie)
        .then(() => {
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

      <Form
        editableData={movieToEdit}
        onFormSubmit={handleEditableMovieSubmit}
        isLoading={isLoading}
      />
    </Fragment>
  )
}

export default EditMoviePage
