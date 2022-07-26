import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const tagSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const articleSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [tagSchema],
      default: [],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;
