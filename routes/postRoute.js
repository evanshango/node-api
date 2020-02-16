const express = require('express');
const {
    getPosts, createPost, postsByUser, postsById, isAuthor, updatePost, deletePost, postPhoto
} = require('../controllers/postController');
const {requireSignin} = require('../controllers/authController');
const {userById} = require('../controllers/userController');
const {createPostValidator} = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);
router.post('/posts/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/posts/:userId', requireSignin, postsByUser);
router.put('/post/update/:postId', requireSignin, isAuthor, updatePost);
router.delete('/post/delete/:postId', requireSignin, isAuthor, deletePost);

router.param('userId', userById);
router.param('postId', postsById);
//photo route
router.get('/post/photo/:postId', postPhoto);

module.exports = router;

