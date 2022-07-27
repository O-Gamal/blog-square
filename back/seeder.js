import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import articles from './data/articles.js';
import User from './models/userModel.js';
import Article from './models/articleModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importUsersData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);

    console.log('data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

const importArticlesData = async () => {
  try {
    await Article.deleteMany();
    await User.insertMany(users);

    console.log('data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

const destroyData = async () => {
  try {
    await Article.deleteMany();
    await User.deleteMany();

    console.log('data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else if (process.argv[2] === '-users') {
  importUsersData();
} else if (process.argv[2] === '-articles') {
  importArticlesData();
}
