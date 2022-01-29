import { FC, Fragment } from 'react'
import Movie from '../../model/Movie'

interface Props {
  movies: Movie[]
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
        </Fragment>
      ))}
    </ul>
  )
}

export default List
