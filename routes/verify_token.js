const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const TOKEN_SECRET = 'qidjjfjshuihua7jj'; //save this to process env
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, TOKEN_SECRET); //returns payload inside token
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};
