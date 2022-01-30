import { FC, Fragment } from 'react'
import Movie from '../../models/Movie'

interface Props {
  movies: Movie[]
  onMovieEdit: (id: number) => void
  onMovieDelete: (id: number) => void
}

const List: FC<Props> = props => {
  return (
    <ul>
      {props.movies.map((movie: Movie, index: number) => (
        <Fragment key={index}>
          <h2>{movie.name}</h2>
          <li>{movie.rating}</li>
          <li>{movie.date}</li>
          <li>{movie.plot}</li>
          <button onClick={() => props.onMovieEdit(movie.id!)}>Edit</button>
          <button onClick={() => props.onMovieDelete(movie.id!)}>Delete</button>
        </Fragment>
      ))}
    </ul>
  )
}

export default List
