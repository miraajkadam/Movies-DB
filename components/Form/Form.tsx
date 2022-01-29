import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Movie from '../../model/Movie'

interface Props {
  onMovieAdd: (movie: Movie) => void
}

const Form: FC<Props> = props => {
  const [movie, setMovie] = useState<Movie>({
    name: '',
    rating: '',
    date: '',
    plot: '',
  })

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const newMovie = new Movie(movie.name, +movie.rating, movie.date, movie.plot)

      props.onMovieAdd(newMovie)
    } catch (err: any) {
      let error = `Error in creating the movie ${err.message && err.message}`
      console.error(error)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setMovie((pre: Movie) => ({ ...pre, [name]: value }))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor='name'>Movie Name: </label>
      <input onChange={handleInputChange} value={movie.name} type='text' name='name' />
      <br />
      <label htmlFor='rating'>Movie rating: </label>
      <input
        onChange={handleInputChange}
        value={movie.rating?.toString()}
        type='number'
        name='rating'
      />
      <br />
      <label htmlFor='date'>Release: </label>
      <input onChange={handleInputChange} value={movie.date} type='date' name='date' />
      <br />
      <label htmlFor='plot'>Plot: </label>
      <textarea onChange={handleInputChange} value={movie.plot} name='plot' />
      <br />
      <input type='submit' />
    </form>
  )
}

export default Form
