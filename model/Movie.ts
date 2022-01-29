export default class Movie {
  name: string
  rating: number | string
  date: string
  plot: string

  constructor(name: string, rating: number, date: string, plot: string) {
    this.name = name
    this.rating = rating
    this.date = date
    this.plot = plot
  }
}
