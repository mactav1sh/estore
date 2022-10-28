import express from 'express';
import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';
import { restrictRoute, protectRoute } from '../middlewares/auth';

const router = express.Router();

// GET ALL USERS
router.get('/', userController.getUsers);

// GET SINGLE USER BY TOKEN
router.get('/profile', protectRoute, userController.getUserByToken);

// GET SINGLE USER
router.get('/:id', userController.getUser);

// UPDATE USER
router.patch(
  '/:id',
  protectRoute,
  restrictRoute('user', 'admin'),
  userController.updateUser
);

// UPDATE PASSWORD
router.patch(
  '/update-password/:id',
  protectRoute,
  authController.updatePassword
);

// DELETE USER
router.delete('/:id', protectRoute, userController.deleteUser);

// AUTHENTICATION
router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);

export default router;
