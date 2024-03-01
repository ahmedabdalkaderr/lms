const router = require('express').Router();

const authController = require('../controllers/auth');

router.post('/login', authController.logIn);

module.exports = router;