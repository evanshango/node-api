const PostController = require('../models/postModel');

exports.getPosts = (req, res) => {
    const posts = PostController.find()
        .select('_id title body')
        .then(posts => {
            res.json({posts})
        })
        .catch(err => console.log(err));
};

exports.createPost = (req, res) => {
    const post = new PostController(req.body);
    post.save().then((result => {
        res.json({
            post: result
        })
    }))
};

