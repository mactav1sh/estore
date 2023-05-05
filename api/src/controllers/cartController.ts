import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import { IUserInfoRequest } from '../interfaces/IExpress';
import Cart from '../models/CartModel';
import AppError from '../utils/AppError';

// GET ALL CARTS - ADMIN
export const getCarts = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get all carts
    const carts = await Cart.find();
    // 2) send data
    res.status(200).json({
      status: 'success',
      length: carts.length,
      carts,
    });
  } catch (error) {
    next(error);
  }
};

// GET USER CART
export const getUserCart = async (
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
    // 2) get the cart that belongs to a user
    const cart = await Cart.find({ userID: req.params.userID }).populate(
      'itemsList'
    );

    if (cart.length === 0)
      return next(
        new AppError(403, "there's no cart associated with this user")
      );

    // 3) send data
    res.status(200).json({
      status: 'success',
      cart: cart[0],
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CART
export const deleteCart = async (
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

    // 2) find cart and delete it
    const cart = await Cart.deleteOne({ userID: req.params.userID });

    // 3) check if there's a cart with this id
    if (!cart)
      return next(
        new AppError(
          404,
          `there is no document with with userID:${req.params.userID} `
        )
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

// UPDATE CART - ADD ITEM
export const addItem = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) check if the req.user.id === req.params.ownerId and the user is not an admin
    if (req.user?.id !== req.params.ownerID && req.user?.role != 'admin') {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // 2) find and update cart (if it exists)
    const updatedCart = await Cart.findOneAndUpdate(
      { userID: req.params.userID },
      {
        $addToSet: {
          itemsList: req.params.productID,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // 3) check if there's a cart with this user id
    if (!updatedCart)
      return next(
        new AppError(
          404,
          `there is no document with this user id:${req.params.userID} `
        )
      );

    // 4) send data
    res.status(200).json({
      status: 'success',
      cart: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CART - REMOVE ITEM
export const removeItem = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get the product id and change it into objectId
    const productID = new mongoose.Types.ObjectId(req.params.productID);

    // 2) check if the req.user.id === req.params.ownerId and the user is not an admin
    if (req.user?.id !== req.params.ownerID && req.user?.role != 'admin') {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // TODO: FIX THIS BUG, CAN'T DELETE LAST ELEMENT OF THE ARRAY IF I USED $pull
    // THIS SOLUTION IS TEMPORARY.

    // 3) get cart
    const cart = await Cart.findOne({ userID: req.params.userID });
    let updatedCart;
    // 4) check if length of items array = 1, if equal one instead of using $pull to remove last element, just set the items array = [] (temp solution)
    if (cart?.itemsList.length === 1) {
      updatedCart = await cart.updateOne(
        { price: 2500, $unset: { itemsList: [] } },
        { runValidators: true }
      );
    } else {
      // else remove the id from the array
      updatedCart = await cart?.updateOne(
        {
          $pullAll: { itemsList: [productID] },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    // 5) check if there's a cart with this user id
    if (!updatedCart)
      return next(
        new AppError(
          404,
          `there is no document with this user id:${req.params.userID} `
        )
      );

    // 5) send data
    res.status(200).json({
      status: 'success',
      cart: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};
