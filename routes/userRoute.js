const express = require('express');
const {userById, allUsers, getUser, updateUser, deleteUser} = require('../controllers/userController');
const {requireSignin} = require('../controllers/authController');

const router = express.Router();
router.get('/users', allUsers);
router.get('/users/:userId', requireSignin, getUser);
router.put ('/users/update/:userId', requireSignin, updateUser);
router.delete ('/users/delete/:userId', requireSignin, deleteUser);

router.param('userId', userById);

module.exports = router;
