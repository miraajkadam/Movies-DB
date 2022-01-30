import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import List from '../components/List/List'
import Movie from '../model/Movie'

const HomePage: NextPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}`)
      setMovies(data)
    } catch (err: any) {
      console.error(`Error in fetching the movies. ${err.message && err.message}`)
    }
    setIsLoading(false)
  }

  const handleMovieEdit = (id: number) => {
    router.push(`/edit/${id}`)
  }

  const handleMovieDelete = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/${id}`).then(() => {
        fetchMovies()
      })
    } catch (err: any) {
      console.error(`Error in deleting the movie. ${err.message && err.message}`)
    }
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <List movies={movies} onMovieEdit={handleMovieEdit} onMovieDelete={handleMovieDelete} />
  )
}

export default HomePage
