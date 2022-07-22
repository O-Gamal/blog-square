const express = require('express');
const articles = require('./data/articles');

const app = express();

app.get('/api/articles/:id', (req, res) => {
  const article = articles.find((a) => a._id === req.params.id);
  res.json(article);
});

app.listen(5000, console.log('server is running on port 5000'));
