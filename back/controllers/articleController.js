import Article from '../models/articleModel.js';

// @desc    Fetch all articles
// @route   GET /api/articles
// @access  Public
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Fetch article by id
// @route   GET /api/articles/:id
// @access  Public
export const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Article.findById(articleId);
    article
      ? res.status(200).json(article)
      : res.status(404).json({ message: 'Article not found' });
  } catch (error) {
    res.status(500).send(error);
  }
};
