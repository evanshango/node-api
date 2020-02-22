exports.createPostValidator = (req, res, next) => {

    //title validation
    req.check('title', "Write a title").notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 10,
        max: 150
    });

    //body validation
    req.check('body', "Write a body").notEmpty();
    req.check('body', 'Body must be between 5 to 2000 characters').isLength({
        min: 5,
        max: 2000
    });

    //check errors
    const errors = req.validationErrors();
    //if error, show the first one as they appear
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError})
    }
    //proceed to next middleware
    next()
};

exports.userSignUpValidator = (req, res, next) => {
    //name isn't null
    req.check("name", 'Name is required').notEmpty();
    req.check('email', 'Email must be 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({min: 4, max: 2000});
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number');

    //check errors
    const errors = req.validationErrors();
    //if error, show the first one as they appear
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError})
    }
    //proceed to next middleware
    next()
};

exports.passwordResetValidator = (req, res, next) => {
    req.check('newPassword', 'Password is required').notEmpty();
    req.check('newPassword')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage('Password must contain a number');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};
