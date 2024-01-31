// Packages
const bcryptjs = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
// Models
const userModel = require('../models/userModel');
// ENV
const { SECRET_KEY } = process.env;

// ----------------------------------------------------------- Auth -----------------------------------------------------------

// POST
// Sign Up
exports.signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    res.status(400);
    throw new Error('All Fields are required');
  }

  const userExists = await userModel.findOne({ username, email });
  if (userExists) {
    res.status(400);
    throw new Error('User exists... try different one');
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'Sign up successfully',
      newUser,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

// POST
// Sign In
exports.signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    res.status(400);
    throw new Error('All Fields are required');
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('Invalid Credentials');
  }

  const { password: pass, ...userData } = user._doc;

  const confirmPassword = bcryptjs.compareSync(password, user.password);
  if (!confirmPassword) {
    res.status(404);
    throw new Error('Invalid Credentials');
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1d' });

  res
    .status(200)
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .json({ success: true, message: 'Signin successful', userData });
});

// POST
// Google Auth
exports.googleAuth = asyncHandler(async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1d' });
      const { password: pass, ...userData } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({ success: true, userData });
    } else {
      const generatedName =
        name.toLowerCase().split(' ').join('') +
        Math.random().toString(9).slice(-4);
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const user = await userModel.create({
        username: generatedName,
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      const token = jwt.sign({ id: user._id }, SECRET_KEY, {
        expiresIn: '1d',
      });
      const { password: pass, ...userData } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json({ success: true, userData });
    }
  } catch (error) {
    res.status(500);
    throw new Error('Internal Server Error');
  }
});
