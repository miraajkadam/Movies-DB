import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { RequestConfig } from '..'
import Movie from '../models/Movie'
import useError from './use-error'

const useRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setMovieError: setError } = useError()

  const sendRequest = async (
    config: RequestConfig,
    callback?: (response: AxiosResponse<{ firebaseKey: { movie: Movie } }, RequestConfig>) => void
  ) => {
    setIsLoading(true)

    try {
      const response: AxiosResponse<any, RequestConfig> = await axios({
        url: config.url,
        method: config.method || 'GET',
        data: config.body && config.body,
      })

      if (callback) callback(response.data)
    } catch (err: any) {
      console.error(config.error)

      setError({
        isError: true,
        name: config.error,
        message: err.message || 'Something went wrong',
      })
    }

    setIsLoading(false)
  }

  return { isLoading, sendRequest }
}

export default useRequest
