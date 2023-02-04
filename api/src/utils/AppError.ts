import { MongooseError } from 'mongoose';

class AppError extends Error {
  isOperational: boolean;
  status: string;
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
  }
}

export default AppError;

MongooseError;
