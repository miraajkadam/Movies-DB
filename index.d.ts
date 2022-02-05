import axios, { AxiosRequestConfig } from 'axios'
import Movie from './models/Movie'

export interface RequestConfig extends Pick<AxiosRequestConfig, 'data' | 'url' | 'method'> {
  body?: AxiosRequestConfig['data']
  error: string
}

export type ResponseType<T = { firebaseKey: { movie: Movie } } | Movie> = T
