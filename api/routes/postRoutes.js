const router = require('express').Router();
// Controllers
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} = require('../controllers/postController');
// Utils
const { verifyUser } = require('../utils/verifyUser');
// ----------------------------------------------------------- Post Routes -----------------------------------------------------------

// POST
// Create Post
router.post('/create', verifyUser, createPost);

// Get
// Get Post
router.get('/getposts', getPosts);

// DELETE
// Delete Post
router.delete('/deletepost/:postId/:userId', verifyUser, deletePost);

// PUT
// Update Post
router.put('/updatepost/:postId/:userId', verifyUser, updatePost);

module.exports = router;
