import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { IUserInfoRequest } from '../interfaces/IExpress';
import Order from '../models/OrderModel';
import AppError from '../utils/AppError';

// GET ALL ORDERS
export const getOrders = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get all orders
    const orders = await Order.find();
    // 2) send data
    res.status(200).json({
      status: 'success',
      length: orders.length,
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET USER ORDERS
export const getUserOrders = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) check if the req.user.id === req.params.ownerId and the user is not an admin
    if (req.user?.id !== req.params.userID && req.user?.role != 'admin') {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // 2) get all orders that belong to a user
    const orders = await Order.find({ userID: req.params.userID });

    // 3) send data
    res.status(200).json({
      status: 'success',
      length: orders.length,
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

// CREATE AN ORDER
export const createOrder = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get user id and change into objectId
    const userID = new mongoose.Types.ObjectId(req.user?.id);
    // 2) get data from req.body
    const dataObj = {
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      status: req.body.status,
      shippingDetails: req.body.shippingDetails,
      paymentMethod: req.body.paymentMethod,
    };
    // 3) create order
    const order = await Order.create({
      userID,
      ...dataObj,
    });

    // 4) send data
    res.status(201).json({
      status: 'success',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE ORDER
export const deleteOrder = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) check if the req.user.id === req.params.ownerId and the user is not an admin
    if (req.user?.id !== req.params.userID && req.user?.role != 'admin') {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // 2) find order and delete it
    const order = await Order.findByIdAndDelete(req.params.orderID);

    // 3) check if there's a order with this id
    if (!order)
      return next(
        new AppError(404, `there is no document with id:${req.params.orderID} `)
      );

    // 4) send confirmation
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
