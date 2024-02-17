const router = require('express').Router();
// Controllers
const {
  createComment,
  getPostComments,
  likeComment,
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

// PUT
// Loke Comments
router.put('/likeComment/:commentId', verifyUser, likeComment);

module.exports = router;
