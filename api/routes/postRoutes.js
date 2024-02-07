const router = require('express').Router();
// Controllers
const { createPost } = require('../controllers/postController');
// Utils
const { verifyUser } = require('../utils/verifyUser');
// ----------------------------------------------------------- Post Routes -----------------------------------------------------------

// POST
// Create Post
router.post('/create', verifyUser, createPost);

module.exports = router;
