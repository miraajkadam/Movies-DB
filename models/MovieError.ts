export default class MovieError extends Error {
  isError: boolean

  constructor(name: string, message: string, isError: boolean = false) {
    super()

    this.name = name
    this.message = message
    this.isError = isError
  }
}
