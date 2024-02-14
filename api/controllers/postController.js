// Packages
const asyncHandler = require('express-async-handler');
// Models
const postModel = require('../models/postModel');

// ----------------------------------------------------------- Post Controllers -----------------------------------------------------------

// POST
// CREATE Posts
exports.createPost = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403);
    throw new Error('You are not allowed to create a post');
  }
  const { title, content, image, category } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }
  const slug = title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-');

  try {
    const post = await postModel.create({
      userId: req.user.id,
      title,
      content,
      image,
      category,
      slug,
    });
    res
      .status(201)
      .json({ success: true, message: 'Post created successfully', post });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// GET
// GET Posts
exports.getPosts = asyncHandler(async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await postModel
      .find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $option: 'i' } },
            { content: { $regex: req.query.searchTerm, $option: 'i' } },
          ],
        }),
      })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await postModel.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await postModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// DELETE
// DELETE Posts
exports.deletePost = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    res.status(403);
    throw new Error('You are not allowed to delete a post');
  }
  try {
    await postModel.findByIdAndDelete(req.params.postId);
    res.status(200).json({ success: true, message: 'Post has been deleted' });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
