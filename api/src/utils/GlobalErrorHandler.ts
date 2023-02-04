import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/IError';
import AppError from './AppError';

function handleProdError(err: IError, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
}

function handleDevError(err: IError, res: Response) {
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,
    value: err.value,
    path: err.path,
    keyValue: err.keyValue,
    message: err.message,
    stack: err.stack,
  });
}

function globalErrorHandler(
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    handleDevError(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError')
      return handleProdError(handleCastError(err), res);
    if (err.code === 11000)
      return handleProdError(handleDuplicateFieldsError(err), res);
    if (err.name === 'ValidationError')
      return handleProdError(handleValidationError(err), res);

    handleProdError(err, res);
  }
}

function handleCastError(err: IError) {
  const message = `invalid value: ${err.value} for field: ${err.path}`;
  return new AppError(400, message);
}

function handleDuplicateFieldsError(err: IError) {
  const data = err.keyValue && Object.entries(err?.keyValue);
  const message = `duplicate value for field: ${data?.[0][0]}, please enter another value`;
  return new AppError(400, message);
}

function handleValidationError(err: IError) {
  const message =
    err.errors &&
    (Object.values(err.errors).map((obj: any) => obj.message) as string[]).join(
      ' / '
    );
  return new AppError(400, message);
}

export default globalErrorHandler;
