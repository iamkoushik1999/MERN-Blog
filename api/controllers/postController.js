// Packages
const asyncHandler = require('express-async-handler');
// Models
const postModel = require('../models/postModel');

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
