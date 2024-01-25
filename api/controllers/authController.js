// Packages
const bcryptjs = require('bcryptjs');
const asyncHandler = require('express-async-handler');
// Models
const userModel = require('../models/userModel');

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

  const userExists = await userModel.find({ username, email });
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

    res.status(200).json({
      success: true,
      message: 'Sign up successfully',
      newUser,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});
