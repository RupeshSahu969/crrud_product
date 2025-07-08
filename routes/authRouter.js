const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/AuthContollers');

router.post('/login', login);
router.post('/register', register); // optional for testing

module.exports = router;
