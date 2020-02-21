const express = require('express');
const {signup, signin, signout} = require('../controllers/authController');
const {userById} = require('../controllers/userController');
const {userSignUpValidator} = require('../validator');

const router = express.Router();
router.post('/signup', userSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.param('userId', userById);

module.exports = router;

