export class HttpException extends Error {
  public status: number
  public message: string
  public code: number

  constructor(error: number, message: string) {
    super(message)
    this.message = message
    this.code = parseInt(error.toString().slice(3, 6))
    this.status = parseInt(error.toString().slice(0, 3))
  }
}
