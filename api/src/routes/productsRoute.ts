import express from 'express';
import * as productController from '../controllers/productController';
import { protectRoute, restrictRoute } from '../middlewares/auth';

const router = express.Router();

// CREATE PRODUCT
router.post('/', protectRoute, productController.createProduct);
// GET ALL PRODUCTS
router.get('/', productController.getProducts);
// GET SINGLE PRODUCT
router.get('/:id', productController.getProduct);
// UPDATE PRODUCT
router.patch(
  '/:ownerID/:productID',
  protectRoute,
  restrictRoute('user', 'admin'),
  productController.updateProduct
);
// DELETE PRODUCT
router.delete(
  '/:ownerID/:productID',
  protectRoute,
  restrictRoute('user', 'admin'),
  productController.deleteProduct
);

export default router;
