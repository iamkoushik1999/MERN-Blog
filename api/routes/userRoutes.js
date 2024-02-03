const router = require('express').Router();
// Controllers
const { updateUser } = require('../controllers/userController');
// Utils
const { verifyUser } = require('../utils/verifyUser');

// ----------------------------------------------------------- User Routes -----------------------------------------------------------

// PUT
// Update User
router.put('/update/:userId', verifyUser, updateUser);

module.exports = router;
