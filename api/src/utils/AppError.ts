class AppError extends Error {
  statusCode;

  status;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status = 'error';
  }
}

export default AppError;
