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
