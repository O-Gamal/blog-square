import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(authenticateToken, getUserProfile)
  .put(authenticateToken, updateUserProfile);

export default router;
