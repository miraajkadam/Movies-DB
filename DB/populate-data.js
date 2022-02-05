const randomMovieNames = require('random-movie-names')
const faker = require('@faker-js/faker').faker
const axios = require('axios')
require('dotenv').config()

let movies = []

const generateFakeMovieData = number => {
  for (let i = 0; i < number; i++) {
    const movieName = randomMovieNames()
    let formattedMovieName = movieName.replace(/([a-z])([A-Z])/g, '$1 $2')
    formattedMovieName = formattedMovieName.replace(/([A-Z])([A-Z])/g, '$1 $2')

    const [name, rating, date, plot] = [
      formattedMovieName,
      Math.floor(Math.random() * 5) + 1,
      faker.date.past().toDateString(),
      faker.lorem.paragraph(),
    ]
    movies.push({ name, rating, date, plot })
  }
}

const postToDb = async () => {
  for (let i = 0; i < movies.length; i++) {
    await axios.post(
      `${process.env.FIREBASE_URL}/moviesDB.json`,
      movies[i]
    )
  }
}

const removeFromDB = async numberOfMovies => {
  const response = await axios.get(
    `${process.env.FIREBASE_URL}/moviesDB.json`
  )
  const movies = response.data
  let ids = []

  for (let [key, value] of Object.entries(movies)) {
    ids.push(key)
  }

  numberOfMovies = ids.length < numberOfMovies ? ids.length : numberOfMovies

  for (let i = 0; i < numberOfMovies; i++) {
    await axios.delete(
      `${process.env.FIREBASE_URL}/moviesDB/${ids[i]}.json`
    )
  }
}

generateFakeMovieData(20)
postToDb()

// removeFromDB(90)
