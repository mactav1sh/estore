import { NextFunction, Response } from 'express';
import jwt, { JwtPayload, VerifyCallback, VerifyErrors } from 'jsonwebtoken';
import { IUserInfoRequest } from '../interfaces/IExpress';
import AppError from '../utils/AppError';
import User from '../models/UserModel';

// RESTRICT ROLES
export function restrictRoute(...rolesArr: string[]) {
  // this function will take an array of roles and return a middleware
  return (req: IUserInfoRequest, _res: Response, next: NextFunction) => {
    // 1) get the role from the req.user object
    const userRole = req.user?.role;
    // 2) check if roles array includes userRoles
    // if it's included allow access
    if (rolesArr.includes(userRole as string)) return next();
    // if it's not included don't allow access
    return next(
      new AppError(403, 'you are not authorized to perform this action')
    );
  };
}

// PROTECT WITH JWT //
export const protectRoute = async (
  req: IUserInfoRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    // 1) get token from headers
    const token = req.headers.authorization?.split(' ')[1] as string;
    // 2) check if there's a token
    if (!token) return next(new AppError(401, 'please log in to gain access'));
    // 3) verify token and (IMPORTANT) provide a callback to make .verify async
    const handleVerification = async (
      err: VerifyErrors,
      decoded: JwtPayload | undefined
    ) => {
      // if there's an error, restrict route
      if (err) {
        return next(new AppError(401, 'you are not authorized to gain access'));
      } else {
        // 1) get user
        const user = await User.findById(decoded?.id);
        // 2) check if there's a user
        if (!user) return next(new AppError(404, 'user is not found'));
        // 3) add the user to the request
        req.user = user;
        return next();
      }
    };

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      handleVerification as VerifyCallback
    );
  } catch (error) {
    next(error);
  }
};
