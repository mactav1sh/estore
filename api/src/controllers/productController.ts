import { Response, NextFunction } from 'express';
import Product from '../models/ProductsModel';
import AppError from '../utils/AppError';
import { IUserInfoRequest } from '../interfaces/IExpress';
import mongoose from 'mongoose';
import { generateSKU } from '../utils/generateSKU';
import QueryMethods from '../utils/QueryMethods';

// GET ALL PRODUCTS
export const getProducts = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get query with additional features
    const query = new QueryMethods(Product.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const products = await query.query;
    // 2) send data
    res.status(200).json({
      status: 'success',
      length: products.length,
      products,
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
    const product = await Product.findById(req.params.id).populate('reviewIDs');

    // 2) check if there's a product
    if (!product)
      return next(
        new AppError(404, `there is no document with id:${req.params.id} `)
      );

    // 3) send data
    res.status(200).json({
      status: 'success',
      product,
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
      imageUrl: req.body.imageUrl,
    };
    // 3) create product
    const newProduct = await Product.create({
      ownerID: userId,
      sku,
      ...dataObj,
    });

    // 4) send data
    res.status(201).json({
      status: 'success',
      product: newProduct,
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
    if (req.user?.id !== req.params.ownerID && req.user?.role != 'admin') {
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

    // 3) find  and update product (if it exists)
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productID,
      { ...updatesObj },
      {
        new: true,
        runValidators: true,
      }
    );

    // 4) check if there's a product with this id
    if (!updatedProduct)
      return next(
        new AppError(
          404,
          `there is no document with id:${req.params.productID} `
        )
      );

    // 5) send data
    res.status(200).json({
      status: 'success',
      product: updatedProduct,
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
    if (req.user?.id !== req.params.ownerID && req.user?.role != 'admin') {
      return next(
        new AppError(403, 'you are not allowed to  perform this action')
      );
    }

    // 2) find product and delete it
    const product = await Product.findByIdAndDelete(req.params.productID);

    // 3) check if there's a product with this id
    if (!product)
      return next(
        new AppError(
          404,
          `there is no document with id:${req.params.productID} `
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
