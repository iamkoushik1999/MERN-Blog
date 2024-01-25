const router = require('express').Router();
const { signup } = require('../controllers/authController');

// ----------------------------------------------------------- Auth -----------------------------------------------------------
// POST
// Sign Up
router.post('/signup', signup);

module.exports = router;
