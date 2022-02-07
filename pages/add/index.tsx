// /add

import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import Form from '../../components/Form/Form'
import Alert from '../../components/Layout/Alert'
import useRequest from '../../hooks/use-request'
import Movie from '../../models/Movie'

const AddPage: NextPage = () => {
  const router = useRouter()

  const { isLoading, sendRequest: PostMovieToServer, error, setError } = useRequest()

  const handleMovieAdd = async (movie: Movie) => {
    await PostMovieToServer(
      {
        url: `${process.env.NEXT_PUBLIC_API_BASE}/add`,
        method: 'POST',
        body: movie,
        error: 'Failed to post the movie to the server',
      },
      response => {
        if (response && response.status === 201) router.push('/')
      }
    )
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
