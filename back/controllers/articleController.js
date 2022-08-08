import Article from '../models/articleModel.js';
import Comment from '../models/commentModel.js';

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

// @desc    Add new article
// @route   Post /api/articles/
// @access  Private
export const addNewArticle = async (req, res) => {
  try {
    const { title, image, body, tags } = req.body;
    if (!title || !body) {
      res.status(400);
      throw new Error('incomplete data');
    }

    const article = await Article.create({
      authorId: req.user._id,
      title,
      image,
      body,
      tags,
    });

    article
      ? res.status(201).json(article)
      : res.status(404).json({ message: 'invalid article data' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @desc    Update Article
// @route   PUT /api/articles/:id
// @access  Private
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (article) {
      const authorId = article.authorId;
      const user = req.user;

      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      if (authorId.toString() !== user._id) {
        res.status(401);
        throw new Error('Not Authorized');
      }

      article.title = req.body.title || article.title;
      article.body = req.body.body || article.body;
      article.image = req.body.image || article.image;
      const updatedArticle = await article.save();
      res.status(200).json(updatedArticle);
    } else {
      res.status(400);
      throw new Error('Article not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @desc    Delete Article
// @route   DELETE /api/articles/:id
// @access  Private
export const deleteArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    const authorId = article.authorId;
    const user = req.user;

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (authorId.toString() !== user._id) {
      res.status(401);
      throw new Error('Not Authorized');
    }

    await article.remove();
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(400);
    throw new Error('Article not found');
  }
};

// @desc    Like Article
// @route   POST /api/articles/:id/likes
// @access  Private
export const likeArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    const user = req.user;

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    await Article.findByIdAndUpdate(article, { $inc: { likesCount: 1 } });
    res.status(200).json(article);
  } else {
    res.status(400);
    throw new Error('Article not found');
  }
};

// @desc    Add Article Comment
// @route   POST /api/articles/:id/comments
// @access  Private
export const addArticleComment = async (req, res) => {
  const article = await Article.findById(req.params.id);
  const { comment } = req.body;

  if (!comment) {
    res.status(400);
    throw new Error('incomplete data');
  }

  if (article) {
    const user = req.user;

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    const commentObj = await Comment.create({ user, comment });

    await Article.findByIdAndUpdate(article, {
      $push: { comments: commentObj },
    });

    res.status(201).json(commentObj);
  } else {
    res.status(400);
    throw new Error('Article not found');
  }
};

// @desc    Delete Article Comment
// @route   DELETE /api/articles/:id/comments
// @access  Private
export const deleteArticleComment = async (req, res) => {
  const article = await Article.findById(req.params.id);
  const commentId = req.body.id;
  const comment = await Comment.findById(commentId);

  if (article) {
    const user = comment.user;

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (user._id !== comment.user) {
      res.status(404).send('Not Authorized');
      return;
    }

    await Article.findByIdAndUpdate(article, {
      $pullAll: { comments: [comment] },
    });
    await comment.remove();

    res.status(200).json(comment);
  } else {
    res.status(400);
    throw new Error('Article not found');
  }
};
