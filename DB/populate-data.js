const randomMovieNames = require('random-movie-names')
const faker = require('@faker-js/faker').faker
const axios = require('axios')

let movies = []

const generateFakeMovieData = number => {
  for (let i = 0; i < number; i++) {
    const [name, rating, date, plot] = [
      randomMovieNames(),
      Math.floor(Math.random() * 5),
      faker.date.past().toDateString(),
      faker.lorem.paragraph(),
    ]
    movies.push({ name, rating, date, plot })
  }
}

const postToDb = async () => {
  for (let i = 0; i < movies.length; i++) {
    await axios.post('http://localhost:3001/movies', movies[i])
  }
}

generateFakeMovieData(5)
postToDb()
