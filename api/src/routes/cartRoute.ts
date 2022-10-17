import express from 'express';
import * as cartController from '../controllers/cartController';
import { protectRoute, restrictRoute } from '../middlewares/auth';

const router = express.Router();

// GET ALL CARTS - ADMIN ONLY
router.get('/', protectRoute, restrictRoute('admin'), cartController.getCarts);

// GET USER CART
router.get(
  '/:userID',
  protectRoute,
  restrictRoute('admin', 'user'),
  cartController.getUserCart
);

// DELETE CART
router.delete(
  '/:userID',
  protectRoute,
  restrictRoute('admin', 'user'),
  cartController.deleteCart
);

// UPDATE CART - ADD ITEM
router.patch(
  '/add/:userID/:productID',
  protectRoute,
  restrictRoute('admin', 'user'),
  cartController.addItem
);

// UPDATE CART - REMOVE ITEM
router.patch(
  '/remove/:userID/:productID',
  protectRoute,
  restrictRoute('admin', 'user'),
  cartController.removeItem
);

export default router;
