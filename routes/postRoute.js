const express = require('express');
const {
    getPosts, createPost, postsByUser, postsById, isAuthor, deletePost
} = require('../controllers/postController');
const {requireSignin} = require('../controllers/authController');
const {userById} = require('../controllers/userController');
const {createPostValidator} = require('../validator');

const router = express.Router();

router.get('/', getPosts);
router.post('/posts/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/:userId', requireSignin, postsByUser);
router.delete('/post/:postId', requireSignin, isAuthor, deletePost);

router.param('userId', userById);
router.param('postId', postsById);

module.exports = router;

