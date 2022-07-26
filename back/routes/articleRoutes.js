import express from 'express';
import {
  getArticles,
  getArticleById,
} from '../controllers/articleController.js';

const router = express.Router();

router.route('/').get(getArticles);

router.route('/:id').get(getArticleById);

export default router;
