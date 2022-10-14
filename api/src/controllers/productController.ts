import { Response, NextFunction } from 'express';
import Product from '../models/ProductsModel';
import AppError from '../utils/AppError';
import { IUserInfoRequest } from '../interfaces/IExpress';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import User from '../models/UserModel';
import { generateSKU } from '../utils/generateSKU';

// GET ALL PRODUCTS
export const getProducts = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get all products
    const products = await Product.find();
    // 2) send data
    res.status(200).json({
      status: 'success',
      length: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE PRODUCT
export const getProduct = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get product
    const product = await Product.findById(req.params.id);

    // 2) check if there's a product
    if (!product)
      return next(
        new AppError(404, `there is no document with id:${req.params.id} `)
      );

    // 3) send data
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

// CREATE A PRODUCT
export const createProduct = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get user id and change into objectId
    // const userId = new ObjectId(req.user?.id);
    const userId = new mongoose.Types.ObjectId(req.user?.id);
    console.log('userId', userId);
    // 2) generate random sku number
    const sku = generateSKU(8);
    // 3) get data from req.body
    const dataObj = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      onSale: req.body.onSale,
      salePrice: req.body.salePrice,
      availablePieces: req.body.availablePieces,
      images: req.body.images,
    };
    // 3) create product
    const product = await Product.create({
      ownerID: userId,
      sku,
      ...dataObj,
    });

    // 4) send data
    res.status(201).json({
      status: 'success',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) check if the req.user.id === req.params.ownerId and the user is not an admin
    if (req.user?.id !== req.params.ownerId && req.user?.role != 'admin') {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // 2) determine fields that can be updated
    const updatesObj = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      onSale: req.body.onSale,
      salePrice: req.body.salePrice,
      availablePieces: req.body.availablePieces,
      images: req.body.images,
    };

    // 3) find  and update user(if it exists)
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...updatesObj },
      {
        new: true,
        runValidators: true,
      }
    );

    // 4) check if there's a product with this id
    if (!updateProduct)
      return next(
        new AppError(404, `there is no document with id:${req.params.id} `)
      );

    // 5) send data
    res.status(200).json({
      status: 'success',
      data: {
        updatedProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) check if the req.user.id === req.params.ownerId and the user is not an admin
    if (req.user?.id !== req.params.ownerId && req.user?.role != 'admin') {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // 2) find product and delete it
    await Product.findByIdAndDelete(req.params.id);

    // 3) send confirmation
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};
