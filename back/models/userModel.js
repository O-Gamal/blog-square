import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bookmarks: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: 'Article',
    },
    followers: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: 'User',
    },
    following: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
