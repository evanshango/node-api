const express = require('express');
const {userById, allUsers, getUser, updateUser, deleteUser} = require('../controllers/userController');
const {requireSignin} = require('../controllers/authController');

const router = express.Router();
router.get('/users', allUsers);
router.get('/users/:userId', requireSignin, getUser);
router.put ('/users/:userId', requireSignin, updateUser);
router.delete ('/users/:userId', requireSignin, deleteUser);

router.param('userId', userById);

module.exports = router;
