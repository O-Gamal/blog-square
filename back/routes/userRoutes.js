import express from 'express';
import {
  loginUser,
  getUser,
  registerUser,
  updateUserProfile,
  followUser,
  unfollowUser,
  bookmarkArticle,
  getUserBookmarks,
  getUserFollowings,
  getUserFollowers,
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router
  .route('/profile')
  .get(authenticateToken, getUser)
  .put(authenticateToken, updateUserProfile);
router.route('/follow').post(authenticateToken, followUser);
router.route('/unfollow').post(authenticateToken, unfollowUser);
router
  .route('/bookmarks')
  .post(authenticateToken, bookmarkArticle)
  .get(authenticateToken, getUserBookmarks);
router.route('/followings').get(authenticateToken, getUserFollowings);
router.route('/followers').get(authenticateToken, getUserFollowers);

export default router;
