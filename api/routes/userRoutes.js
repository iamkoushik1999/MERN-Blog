const router = require('express').Router();
// Controllers
const {
  updateUser,
  deleteUser,
  signOut,
  getUsers,
} = require('../controllers/userController');
// Utils
const { verifyUser } = require('../utils/verifyUser');

// ----------------------------------------------------------- User Routes -----------------------------------------------------------

// PUT
// Update User
router.put('/update/:userId', verifyUser, updateUser);

// Delete
// Delete User
router.delete('/delete/:userId', verifyUser, deleteUser);

// POST
// Sign Out
router.post('/signout', signOut);

// GET
// Get Users
router.get('/getusers', verifyUser, getUsers);

module.exports = router;
