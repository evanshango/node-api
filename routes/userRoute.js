const express = require('express');
const {
    userById, allUsers, getUser, updateUser, deleteUser, userPhoto, addFollowing, addFollower,
    removeFollowing, removeFollower
} = require('../controllers/userController');
const {requireSignin} = require('../controllers/authController');

const router = express.Router();

router.put('/user/follow', requireSignin, addFollowing, addFollower);
router.put('/user/unfollow', requireSignin, removeFollowing, removeFollower);

router.get('/users', allUsers);
router.get('/users/:userId', requireSignin, getUser);
router.put('/users/update/:userId', requireSignin, updateUser);
router.delete('/users/delete/:userId', requireSignin, deleteUser);
//photo route
router.get('/user/photo/:userId', userPhoto);

router.param('userId', userById);

module.exports = router;
