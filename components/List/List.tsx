import { SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import Movie from '../../models/Movie'
import Card from './Card'

interface Props {
  movies: Movie[]
  onMovieEdit: (id: string) => void
  onMovieDelete: (id: string) => void
}

const List: FC<Props> = props => (
  <SimpleGrid spacing={10} columns={[2, 2, 3, 3, 4]} pl={10} pr={10} mb={10}>
    {props.movies.map((movie: Movie, index: number) => (
      <Card
        key={index}
        id={movie.id!}
        name={movie.name}
        rating={movie.rating}
        plot={movie.plot}
        date={movie.date}
        onMovieEdit={() => {
          props.onMovieEdit(movie.id!)
        }}
        onMovieDelete={() => {
          props.onMovieDelete(movie.id!)
        }}
      />
    ))}
  </SimpleGrid>
)

export default List
