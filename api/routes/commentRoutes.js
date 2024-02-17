const router = require('express').Router();
// Controllers
const {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
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

// Delete
// Delete Comments
router.delete('/deleteComment/:commentId', verifyUser, deleteComment);

module.exports = router;
