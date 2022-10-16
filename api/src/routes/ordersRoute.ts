import express from 'express';
import * as orderController from '../controllers/orderController';
import { protectRoute, restrictRoute } from '../middlewares/auth';

const router = express.Router();

// GET ALL ORDERS - ADMIN ONLY
router.get(
  '/',
  protectRoute,
  restrictRoute('admin'),
  orderController.getOrders
);

// GET ALL USER ORDERS
router.get(
  '/:userID',
  protectRoute,
  restrictRoute('admin', 'user'),
  orderController.getUserOrders
);

// CREATE ORDER
router.post(
  '/',
  protectRoute,
  restrictRoute('admin', 'user'),
  orderController.createOrder
);

// DELETE ORDER
router.delete(
  '/:userID/:orderID',
  protectRoute,
  restrictRoute('admin', 'user'),
  orderController.deleteOrder
);

export default router;
