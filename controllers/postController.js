const PostModel = require('../models/postModel');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.getPosts = (req, res) => {
    const posts = PostModel.find()
        .populate('postedBy', '_id name')
        .populate('comments', 'text created')
        .populate('comments.postedBy', '_id name ')
        .select('_id title body created likes')
        .sort({created: -1})
        .then(posts => {
            res.json(posts)
        })
        .catch(err => console.log(err));
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        let post = new PostModel(fields);

        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        req.profile.created = undefined;
        req.profile.updated = undefined;

        post.postedBy = req.profile;
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result);
        })
    });
};

exports.postsByUser = (req, res) => {
    PostModel.find({postedBy: req.profile._id})
        .populate('postedBy', '_id name')
        .select('_id title body created likes')
        .sort('_created')
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({error: err})
            }
            res.json(posts);
        })

};

exports.postsById = (req, res, next, id) => {
    PostModel.findById(id)
        .populate('postedBy', '_id name')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                });
            }
            req.post = post;
            next();
        })
};

exports.isAuthor = (req, res, next) => {
    let isAuthor = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if (!isAuthor) {
        return res.status(403).json({
            error: 'User is not authorized'
        })
    }
    next();
};

exports.updatePost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({error: 'Photo could not be uploaded'})
        }
        let post = req.post;
        post = _.extend(post, fields);
        post.updated = Date.now();
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({error: err})
            }
            res.json({post})
        })
    })
};

exports.deletePost = (req, res) => {
    let post = req.post;
    post.remove((err, post) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Post deleted successfully'
        })
    });
};

exports.postPhoto = (req, res, next) => {
    res.set('Content-Type', req.post.photo.contentType);
    return res.send(req.post.photo.data);
};

exports.singlePost = (req, res) => {
    return res.json(req.post);
};

exports.likePost = (req, res) => {
    PostModel.findByIdAndUpdate(req.body.postId,
        {$push: {likes: req.body.userId}},
        {new: true}).exec((err, result) => {
            if (err){
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result)
            }
    })
};

exports.unlikePost = (req, res) => {
    PostModel.findByIdAndUpdate(req.body.postId,
        {$pull: {likes: req.body.userId}},
        {new: true}).exec((err, result) => {
        if (err){
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
};

exports.commentPost = (req, res) => {
    let comment = req.body.comment;
    comment.postedBy = req.body.userId;
    PostModel.findByIdAndUpdate(req.body.postId,
        {$push: {comments: comment}},
        {new: true})
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, result) => {
        if (err){
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
};

exports.uncommentPost = (req, res) => {
    let comment = req.body.comment;
    PostModel.findByIdAndUpdate(req.body.postId,
        {$pull: {comments: {_id: comment._id}}},
        {new: true})
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, result) => {
            if (err){
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result)
            }
        })
};



