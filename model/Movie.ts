export default class Movie {
  id?: number
  name: string
  rating: number | string
  date: string
  plot: string

  constructor(name: string, rating: number, date: string, plot: string, id?: number) {
    this.name = name
    this.rating = rating
    this.date = date
    this.plot = plot
    this.id = id && id
  }
}
