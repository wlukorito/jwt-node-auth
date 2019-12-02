const Router = require('express').Router();
const verify = require('./verify_token');

Router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: 'privat shit'
        },
        data: req.user
    });
});

module.exports = Router;
