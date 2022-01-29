// /add

import { NextPage } from 'next'
import { Fragment } from 'react'
import { Movies } from '../index'
import Form from '../../components/Form/Form'
import Movie from '../../model/Movie'
import Head from 'next/head'

const AddPage: NextPage = () => {
  const handleMovieAdd = (movie: Movie) => {
    Movies.push(movie)
  }

  return (
    <Fragment>
      <Head>
        <title>Add a Movie</title>
      </Head>
      <Form onMovieAdd={handleMovieAdd} />
    </Fragment>
  )
}

// export async function getStaticProps() {
//   console.log(process.env.NEXT_PUBLIC_FIREBASE_URL) // ...
//   return { props: {} }
// }

export default AddPage
