const express = require('express');
const router = express.Router();
const { checkStatus } = require('../controllers/statusController');

router.post('/check', checkStatus);

module.exports = router;
