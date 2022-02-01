export default class Movie {
  id?: string
  name: string
  rating: number | string
  date: string
  plot: string

  constructor(name: string, rating: number, date: string, plot: string, id?: string) {
    this.name = name
    this.rating = rating
    this.date = new Date(date).toDateString()
    this.plot = plot
    this.id = id
  }
}
