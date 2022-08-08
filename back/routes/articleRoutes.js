import express from 'express';
import {
  getArticles,
  getArticleById,
  addNewArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  addArticleComment,
  deleteArticleComment,
} from '../controllers/articleController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getArticles).post(authenticateToken, addNewArticle);

router
  .route('/:id')
  .get(getArticleById)
  .put(authenticateToken, updateArticle)
  .delete(authenticateToken, deleteArticle);

router.route('/:id/likes').post(authenticateToken, likeArticle);
router
  .route('/:id/comments')
  .post(authenticateToken, addArticleComment)
  .delete(authenticateToken, deleteArticleComment);

export default router;
