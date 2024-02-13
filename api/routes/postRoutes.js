const router = require('express').Router();
// Controllers
const { createPost, getPosts } = require('../controllers/postController');
// Utils
const { verifyUser } = require('../utils/verifyUser');
// ----------------------------------------------------------- Post Routes -----------------------------------------------------------

// POST
// Create Post
router.post('/create', verifyUser, createPost);

// Get
// Get Post
router.get('/getposts', getPosts);

module.exports = router;
