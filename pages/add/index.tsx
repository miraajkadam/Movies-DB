// /add

import { NextPage } from 'next'
import { Fragment } from 'react'
import { Movies } from '../index'
import Form from '../../components/Form/Form'
import Movie from '../../model/Movie'

const AddPage: NextPage = () => {
  const handleMovieAdd = (movie: Movie) => {
    Movies.push(movie)
  }

  return (
    <Fragment>
      <Form onMovieAdd={handleMovieAdd} />
    </Fragment>
  )
}

// export async function getStaticProps() {
//   console.log(process.env.NEXT_PUBLIC_FIREBASE_URL) // ...
//   return { props: {} }
// }

export default AddPage
