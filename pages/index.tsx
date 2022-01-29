// /edit

import type { NextPage } from 'next'
import List from '../components/List/List'
import Movie from '../model/Movie'

export let Movies: Movie[] = []

const Home: NextPage = () => {
  console.log(Movies)
  return <List movies={Movies} />
}

export default Home
