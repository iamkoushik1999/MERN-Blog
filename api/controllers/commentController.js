// Packages
const asyncHandler = require('express-async-handler');
// Models
const commentModel = require('../models/commentModel');

// ----------------------------------------------------------- Comment Controllers -----------------------------------------------------------

// POST
// CREATE Comment
exports.createComment = asyncHandler(async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      res.status(403);
      throw new Error('You are not allowed to comment');
    }

    const comment = await commentModel.create({
      content,
      postId,
      userId,
    });
    res.status(201).json({
      success: true,
      message: 'New comment saved',
      comment,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
