const express = require('express');
const {getPosts, createPost} = require('../controllers/postController');
const {requireSignin} = require('../controllers/authController');
const {userById} = require('../controllers/userController');
const {createPostValidator} = require('../validator');

const router = express.Router();

router.get('/', getPosts);
router.post('/add-post', requireSignin, createPostValidator, createPost);

router.param('userId', userById);

module.exports = router;

