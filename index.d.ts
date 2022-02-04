import axios, { AxiosRequestConfig } from 'axios'
export interface RequestConfig extends Pick<AxiosRequestConfig, 'data' | 'url' | 'method'> {
  body?: AxiosRequestConfig['data']
  error: string
}
