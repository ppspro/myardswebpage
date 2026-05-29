const express = require('express');
const router = express.Router();
const { authAdmin, createInitialAdmin } = require('../controllers/authController');

router.post('/login', authAdmin);
router.post('/init', createInitialAdmin); // For testing

module.exports = router;
