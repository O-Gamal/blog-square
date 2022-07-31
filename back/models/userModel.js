import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
