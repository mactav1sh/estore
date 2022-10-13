import { Request, Response, NextFunction } from 'express';
import Product from '../models/ProductsModel';
import AppError from '../utils/AppError';

// GET ALL PRODUCTS
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = Product.find();
  } catch (error) {
    next(error);
  }
};

// GET SINGLE PRODUCT
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

// // GET ALL PRODUCTS
// export const getProducts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
// // GET ALL PRODUCTS
// export const getProducts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
