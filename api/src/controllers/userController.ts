import { Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import User from '../models/UserModel';
import { IUserInfoRequest } from '../interfaces/IExpress';

// GET ALL USERS
export const getUsers = async (
  _req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get all users, and don't include 'role, updatedAt, __v' in the object
    const users = await User.find({}, '-role -updatedAt -__v');
    // 2) send data
    res.status(200).json({
      status: 'success',
      length: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE USER
export const getUser = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get user
    const user = await User.findById(req.params.id);
    // 2) check if there's a user
    if (!user)
      return next(
        new AppError(404, `there is no document with id:${req.params.id} `)
      );
    // 3) send user
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER INFO ONLY - WITHOUT PASSWORD
export const updateUser = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) check if the current user id = the user's id that will be updated
    if (req.params.id !== req.user?.id) {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // 2) check if the current user trying to update password from this route
    if (req.body.password || req.body.passwordConfirm) {
      throw new AppError(
        400,
        'you cannot change password from this route, please use /update-password'
      );
    }
    // 3) find  and update user(if it exists)
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email },
      {
        new: true,
        runValidators: true,
      }
    );

    // 4) check if there's a user with this id
    if (!updateUser)
      return next(
        new AppError(404, `there is no document with id:${req.params.id} `)
      );

    // 5) send updated user
    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE USER
export const deleteUser = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) check if the current user id = the user's id that will be delete
    if (req.params.id !== req.user?.id) {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // 2) find user and delete it
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};
