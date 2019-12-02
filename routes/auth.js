const Router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Pool = require('./db-connection');
const { registerValidation, loginValidation } = require('./validation');

Router.post('/register', async (req, res) => {
    //validate request
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        //bcrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //save user to db
        Pool.getConnection((err, connection) => {
            if (err) return console.log('Could not connect to database');
            console.log('Connected');
            //check if user exists
            connection.query(
                'select * from luko_user where email = ?',
                [req.body.email],
                (er, rows, fields) => {
                    if (er)
                        return res
                            .status(500)
                            .send('Error validating user details');
                    if (rows.length === 0) {
                        //email not exists
                        connection.query(
                            'insert into luko_user (name, email, password) values (?, ?, ?)',
                            [req.body.name, req.body.email, hashedPassword],
                            (er, result) => {
                                connection.release();
                                if (er) {
                                    console.log('Error: ', er);
                                    return res
                                        .status(400)
                                        .send('Error creating user');
                                }
                                console.log(result);
                                return res.send(
                                    `User id ${result.insertId} created.`
                                );
                            }
                        );
                    } else {
                        return res.status(400).send('Email already exists');
                    }
                }
            );
        });
    } catch (err) {
        console.log('Error hashing password: ', err);
        return res.status(500).send('Error hashing password');
    }
});

Router.post('/login', (req, res) => {
    //validate
    const { error } = loginValidation(req.body);
    if (error) return res.send(error.details[0].message);
    //check if email exists
    Pool.getConnection((err, connection) => {
        if (err) return res.status(500).send('Error occured');
        connection.query(
            'select id, email, password from luko_user where email = ?',
            [req.body.email],
            async (er, rows, fields) => {
                connection.release();
                if (er) return res.status(500).send('Error logging in');
                if (!rows.length) {
                    return res.status(400).send('Invalid email');
                }
                //compare password
                const isValid = await bcrypt.compare(
                    req.body.password,
                    rows[0].password
                );
                if (!isValid) return res.status(400).send('Wrong password');

                //Create and assign a token
                //Store this on the process env
                const TOKEN_SECRET = 'qidjjfjshuihua7jj';
                const token = jwt.sign({ id: rows[0].id }, TOKEN_SECRET);
                res.header('auth-token', token).send(token);
                //return res.send('Successful login');
            }
        );
    });
});

module.exports = Router;
