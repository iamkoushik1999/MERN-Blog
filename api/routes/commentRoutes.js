const router = require('express').Router();
// Controllers
const { createComment } = require('../controllers/commentController');
// Utils
const { verifyUser } = require('../utils/verifyUser');
// ----------------------------------------------------------- Comment Routes -----------------------------------------------------------

// POST
// Create Post
router.post('/create', verifyUser, createComment);

module.exports = router;
