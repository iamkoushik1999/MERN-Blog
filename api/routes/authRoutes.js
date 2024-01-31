const router = require('express').Router();
const { signup, signin, googleAuth } = require('../controllers/authController');

// ----------------------------------------------------------- Auth -----------------------------------------------------------
// POST
// Sign Up
router.post('/signup', signup);

// POST
// Sign In
router.post('/signin', signin);

// POST
// Sign In
router.post('/google', googleAuth);

module.exports = router;
