import { NextFunction, Response } from 'express';
import User from '../models/UserModel';
import Cart from '../models/CartModel';
import AppError from '../utils/AppError';
import { IUserInfoRequest } from '../interfaces/IExpress';
import { createAndSendToken } from '../utils/jwt';

// SIGN UP USER
export const signUp = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) create user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      // NOTE: role can only be specified if in development
      role: process.env.NODE_ENV === 'development' ? req.body.role : 'user',
    });

    // 2) create and send token
    createAndSendToken(newUser, res, 201);
  } catch (error) {
    next(error);
  }
};

// SIGN IN USER
export const signIn = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get email and password from request body
    const { email, password } = req.body;

    // 2) check if the email and password is in the request body
    if (!email || !password)
      return next(new AppError(404, 'please provide the required credentials'));

    // 3) find user and use '+operator' to include password in the user object
    const user = await User.findOne({ email }).select('+password');

    // 4) check if there's a user
    if (!user)
      return next(new AppError(404, 'please provide the correct credentials'));

    // 5) compare provided password and hashed password
    const isAuthorized = await user.comparePasswords(
      password,
      user.password as string
    );

    // 6) check if is the user is authorized
    if (!isAuthorized)
      return next(new AppError(404, 'please provide the correct credentials'));

    // 7) create and send token
    createAndSendToken(user, res, 200);
  } catch (error) {
    next(error);
  }
};

// UPDATE PASSWORD
export const updatePassword = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) Check if the current user id = the user's id that will be updated
    if (req.params.id !== req.user?.id) {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }
    // 2) get the password and passowrd confirm from request body
    const { password, passwordConfirm } = req.body;

    // 3) get the user
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError(404, 'Invalid request make sure token is not expired');
    }

    // IMPORTANT NOTE - this way was used instead of findByIdandUpdate, because mongoose middlewares only run on .save
    // 4) update passowrd
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    // 5) update user
    await user.save();
    // 6) create and send token
    createAndSendToken(user, res, 200);
  } catch (error) {
    next(error);
  }
};
