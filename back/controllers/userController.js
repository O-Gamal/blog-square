import User from '../models/userModel.js';
import Article from '../models/articleModel.js';
import genToken from '../utils/genToken.js';

// @desc    login user and get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const matchPassword = await user.matchPassword(password);
    if (user && matchPassword) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genToken(user._id),
      });
    } else {
      res.status(401).send('invalid email or password');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Register a new uers
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).send('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genToken(user._id),
      });
    } else {
      res.status(401).send('invalid user data');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('user not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  Public
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('user not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).send('user not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Follow user
// @route   POST /api/users/follow
// @access  Private
export const followUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const followeeId = req.body.id;
    const followee = await User.findById(followeeId);

    if (req.user._id === followeeId) {
      res.status(404).send('Can not follow your self!');
      return;
    }

    if (!user) {
      res.status(404).send('user not found');
    }

    if (!followee) {
      res.status(404).send('followee not found');
    }

    const alreadyFollowing = await User.findOne({
      following: { $in: [followee] },
    });
    if (alreadyFollowing) {
      res.status(404).send(`already following ${followee.name}`);
      return;
    }

    await Promise.all([
      User.findByIdAndUpdate(user, { $push: { following: followee } }),
      User.findByIdAndUpdate(followee, { $push: { followers: user } }),
    ]);
    res.status(200).json(`${user.name} followed ${followee.name}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Unfollow user
// @route   POST /api/users/unfollow
// @access  Private
export const unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const followeeId = req.body.id;
    const followee = await User.findById(followeeId);

    if (!user) {
      res.status(404).send('user not found');
    }

    const alreadyFollowing = await User.findOne({
      following: { $in: [followee] },
    });

    if (!alreadyFollowing) {
      res.status(404).send(`not following ${followee.name} already`);
      return;
    }

    await Promise.all([
      User.findByIdAndUpdate(user, {
        $pullAll: { following: [followeeId] },
      }),
      User.findByIdAndUpdate(followee, {
        $pullAll: { followers: [req.user._id] },
      }),
    ]);

    res.status(200).json(`${user.name} unfollowed ${followee.name}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Bookmark Article
// @route   POST /api/users/bookmarks
// @access  Private
export const bookmarkArticle = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const articleId = req.body.id;
    const article = await Article.findById(articleId);

    if (!user) {
      res.status(404).send('user not found');
    }

    if (!article) {
      res.status(404).send('article not found');
    }

    const alreadyBookmarked = await User.findOne({
      bookmarks: { $in: [article] },
    });

    if (alreadyBookmarked) {
      res.status(404).send('already bookmarked');
      return;
    }

    await User.findByIdAndUpdate(user, { $push: { bookmarks: article } });
    res.status(200).json(`bookmarked ${article.title}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Get User Bookmarks
// @route   Get /api/users/bookmarks
// @access  Private
export const getUserBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).send('user not found');
    }

    const bookmarks = await Article.find({ _id: user.bookmarks });

    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Get User Followings
// @route   Get /api/users/followings
// @access  Private
export const getUserFollowings = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).send('user not found');
    }

    const followings = await User.find({ _id: user.following });

    res.status(200).json(followings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @desc    Get User Followers
// @route   Get /api/users/followers
// @access  Private
export const getUserFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).send('user not found');
    }

    const followers = await User.find({ _id: user.followers });

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).send(error);
  }
};
