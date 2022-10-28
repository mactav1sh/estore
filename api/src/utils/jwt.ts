import { Response } from 'express';
import IUser from '../interfaces/IUser';
import jwt from 'jsonwebtoken';

export function createAndSendToken(
  user: IUser,
  res: Response,
  statusCode: number
) {
  // 1) create token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

  // 2) send jwt in header
  res.setHeader('Authorization', `Bearer ${token}`);

  // 3) remove password from data
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    user,
  });
}
