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

// GET
// GET Comments
exports.getPostComments = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await commentModel
      .find({ postId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// PUT
// Like Comments
exports.likeComment = asyncHandler(async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      res.status(404);
      throw new Error('No comment found');
    }

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// PUT
// Edit Comments
exports.editComment = asyncHandler(async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const comment = await commentModel.findById(commentId);
    if (!comment) {
      res.status(404);
      throw new Error('No comment found');
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      res.status(403);
      throw new Error('You are not allowed to edit this comment');
    }

    const editedComment = await commentModel.findByIdAndUpdate(
      commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );

    res.status(200).json(editedComment);

    res.status(200).json(comment);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
