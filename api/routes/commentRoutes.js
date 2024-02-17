const router = require('express').Router();
// Controllers
const {
  createComment,
  getPostComments,
  likeComment,
  editComment,
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
// Like Comments
router.put('/likeComment/:commentId', verifyUser, likeComment);

// PUT
// Edit Comments
router.put('/editComment/:commentId', verifyUser, editComment);

module.exports = router;
