const router = require('express').Router();
// Controllers
const { test } = require('../controllers/userController');

// ----------------------------------------------------------- User Routes -----------------------------------------------------------
// GET
// Test
router.get('/test', test);

module.exports = router;
