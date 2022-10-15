import express from 'express';
import * as reviewController from '../controllers/reviewController';
import { protectRoute, restrictRoute } from '../middlewares/auth';

const router = express.Router();

// GET ALL REVIEWS
router.get('/', reviewController.getReviews);
// GET SINGLE REVIEW
router.get('/:id', reviewController.getReview);
// CREATE A REVIEW
router.post('/:productID', protectRoute, reviewController.createReview);
// UPDATE A REVIEW
router.patch(
  '/:ownerID/:reviewID',
  protectRoute,
  restrictRoute('user', 'admin'),
  reviewController.updateReview
);
// DELETE A REVIEW
router.delete(
  '/:ownerID/:reviewID',
  protectRoute,
  restrictRoute('user', 'admin'),
  reviewController.deleteReview
);

export default router;
