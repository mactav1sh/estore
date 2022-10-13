/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/IError';

function globalErrorHandler(
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
}

export default globalErrorHandler;
