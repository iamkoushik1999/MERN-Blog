const router = require('express').Router();
// Controllers
const {
  createComment,
  getPostComments,
} = require('../controllers/commentController');
// Utils
const { verifyUser } = require('../utils/verifyUser');
// ----------------------------------------------------------- Comment Routes -----------------------------------------------------------

// POST
// Create Comments
router.post('/create', verifyUser, createComment);

// GET
// Get Comments
router.get('/getPostComments/:postId', getPostComments);

module.exports = router;
