// Packages
const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
// Models
const userModel = require('../models/userModel');

// ----------------------------------------------------------- User Controllers -----------------------------------------------------------

// PUT
// Update User
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (req.user.id !== userId) {
    res.status(403);
    throw new Error('Forbidden');
  }
  const { username, email, profilePicture } = req.body;

  // Password error check
  if (req.body.password) {
    if (req.body.password.length < 6) {
      res.status(400);
      throw new Error('Password must be atleast 6 characters');
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  // Username error check
  if (username) {
    if (username.length < 7 || username.length > 20) {
      res.status(400);
      throw new Error('Username must be between 7 and 20 characters');
    }
    if (username.includes(' ')) {
      res.status(400);
      throw new Error('Username cannot contain spaces');
    }
    if (username !== username.toLowerCase()) {
      res.status(400);
      throw new Error('Username must be lowercase');
    }
    if (!username.match(/^[a-zA-Z0-9]/)) {
      res.status(400);
      throw new Error('Username can only contain letters and numbers');
    }
  }
  // Update user
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: username,
          email: email,
          profilePicture: profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...userData } = updatedUser._doc;

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      userData,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// Delete
// Delete User
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (req.user.id !== userId) {
    res.status(403);
    throw new Error('Forbidden');
  }

  try {
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// POST
// Sign Out
exports.signOut = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json({
      success: true,
      message: 'User has been signed out',
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// GET
// Get Users
exports.getUsers = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('You are not allowed see all users');
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const users = await userModel
      .find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    // .select('-password');

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await userModel.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await userModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      // users,
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
