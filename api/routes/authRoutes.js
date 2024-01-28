const router = require('express').Router();
const { signup, signin } = require('../controllers/authController');

// ----------------------------------------------------------- Auth -----------------------------------------------------------
// POST
// Sign Up
router.post('/signup', signup);

// POST
// Sign In
router.post('/signin', signin);

module.exports = router;
