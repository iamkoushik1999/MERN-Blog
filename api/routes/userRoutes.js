const router = require('express').Router();
// Controllers
const { updateUser, deleteUser } = require('../controllers/userController');
// Utils
const { verifyUser } = require('../utils/verifyUser');

// ----------------------------------------------------------- User Routes -----------------------------------------------------------

// PUT
// Update User
router.put('/update/:userId', verifyUser, updateUser);

// Delete
// Delete User
router.delete('/delete/:userId', verifyUser, deleteUser);

module.exports = router;
