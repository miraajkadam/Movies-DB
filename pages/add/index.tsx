// /add

import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { MovieError } from '../..'
import Form from '../../components/Form/Form'
import Alert from '../../components/Layout/Alert'
import Movie from '../../models/Movie'

const AddPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<MovieError>({ isError: false, name: '', message: '' })

  const router = useRouter()

  const handleMovieAdd = async (movie: Movie) => {
    setIsLoading(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE}/add`, movie)
      router.push('/')
    } catch (err: any) {
      console.error(`Error in posting movie to database. ${err.message && err.message}`)
      setError({
        isError: true,
        name: 'Error in posting the movie to databases',
        message: err.message,
      })
    }

    setIsLoading(false)
  }

  return (
    <Fragment>
      <Head>
        <title>Add a Movie</title>
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
      <Form onFormSubmit={handleMovieAdd} isLoading={isLoading} />
    </Fragment>
  )
}

export default AddPage
