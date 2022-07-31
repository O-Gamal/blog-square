import User from '../models/userModel.js';
import genToken from '../utils/genToken.js';

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
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

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
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
