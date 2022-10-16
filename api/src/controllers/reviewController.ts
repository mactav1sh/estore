import mongoose from 'mongoose';
import { NextFunction, Response } from 'express';
import Review from '../models/ReviewModel';
import Product from '../models/ProductsModel';
import { IUserInfoRequest } from '../interfaces/IExpress';
import AppError from '../utils/AppError';

// GET ALL REVIEWS
export const getReviews = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get all reviews
    const reviews = await Review.find();
    // 2) send data
    res.status(200).json({
      status: 'success',
      length: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE REVIEW
export const getReview = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) get review
    const review = await Review.findById(req.params.id);

    // 2) check if there's a review
    if (!review)
      return next(
        new AppError(404, `there is no document with id:${req.params.id} `)
      );

    // 3) send data
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (error) {
    next(error);
  }
};

// CREATE A REVIEW
export const createReview = async (
  req: IUserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) check if there's a product id
    if (!req.params.productID) {
      return next(new AppError(400, 'you must provide a valid product id'));
    }

    // 2) get user id and product id and change them into objectId to be able use populate later
    const userID = new mongoose.Types.ObjectId(req.user?.id);
    const productID = new mongoose.Types.ObjectId(req.params.productID);

    // 3) get data from req.body
    const dataObj = {
      review: req.body.review,
      rating: req.body.rating,
    };

    // 4) create review
    const review = await Review.create({
      ...dataObj,
      userID,
      productID,
    });

    // 5) add the new review id to product reviewIDs array

    await Product.findByIdAndUpdate(
      req.params.productID,
      { $push: { reviewIDs: review.id } },
      {
        runValidators: true,
      }
    );
    // 6) send data
    res.status(201).json({
      status: 'success',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE REVIEW
export const updateReview = async (
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
      review: req.body.review,
      rating: req.body.rating,
    };

    // 3) find  and update review (if it exists)
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.reviewID,
      { ...updatesObj },
      {
        new: true,
        runValidators: true,
      }
    );

    // 4) check if there's a review with this id
    if (!updatedReview)
      return next(
        new AppError(
          404,
          `there is no document with id:${req.params.reviewID} `
        )
      );

    // 5) send data
    res.status(200).json({
      status: 'success',
      data: {
        review: updatedReview,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE A REVIEW
export const deleteReview = async (
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
    // 2) find review and delete it
    const review = await Review.findByIdAndDelete(req.params.reviewID);

    // 3) check if there's a review with this id
    if (!review)
      return next(
        new AppError(
          404,
          `there is no document with id:${req.params.reviewID} `
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
