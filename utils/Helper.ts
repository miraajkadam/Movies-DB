import { AxiosResponse } from 'axios'
import { RequestConfig, ResponseType } from '../index.d'
import Movie from '../models/Movie'

export default class Helper {
  constructor() {}

  /**
   * Transforms response from server into array and sets it into state
   * @param {AxiosResponse<any, RequestConfig>} response: response from the server
   * @returns {Movie[]} fetchedMovies: array of fetched movies
   */
  transformMoviesIntoArray = (response: AxiosResponse<any, RequestConfig>): Movie[] => {
    const data: ResponseType = response.data

    let fetchedMovies: Movie[] = []

    if (data)
      for (let [key, value] of Object.entries(data)) {
        fetchedMovies.push({ ...value, id: key })
      }

    return fetchedMovies
  }
}
