import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Form from '../../components/Form/Form'
import Movie from '../../model/Movie'

const EditMoviePage = () => {
  const [movieToEdit, setMovieToEdit] = useState<Movie | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    fetchMovieToEdit()
  }, [router.isReady])

  const fetchMovieToEdit = async () => {
    const { movieId } = router.query

    const response = await axios.get(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/${movieId}`)
    const { data } = response

    setMovieToEdit(data)
  }

  const handleEditableMovieSubmit = async (movie: Movie) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/${movie.id}`, movie).then(() => {
        router.push('/')
      })
    } catch (err: any) {
      console.error(`Error in updating movie. ${err.message && err.message}`)
    }
  }

  return <Form editableData={movieToEdit} onFormSubmit={handleEditableMovieSubmit} />
}

export default EditMoviePage
