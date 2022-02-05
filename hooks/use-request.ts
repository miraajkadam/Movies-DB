import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { RequestConfig } from '..'
import useError from './use-error'

const useRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { error, setMovieError: setError } = useError()

  const sendRequest = async (
    config: RequestConfig,
    callback?: (response: AxiosResponse<any, RequestConfig>) => void
  ) => {
    setIsLoading(true)

    try {
      const response: AxiosResponse<any, RequestConfig> = await axios({
        url: config.url,
        method: config.method || 'GET',
        data: config.body && config.body,
      })

      if (callback) callback(response)
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

  return { isLoading, sendRequest, error, setError }
}

export default useRequest
