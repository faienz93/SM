/**
 * ===========================================================================
 * File: UserDB.js 
 * Author: Antonio Faienza
 * This file manages the insertion, removal, updating of a user's data
 * ===========================================================================
 */

// dependency
var express = require("express");
const mongoose = require('mongoose');
var nodemailer = require('nodemailer');
const router = express.Router();
const { body, check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

/**
 * Mongoose
 */
const Users = mongoose.model('Users');


/* ---------------------------------------------------
    ADD USER
----------------------------------------------------- */
router.get('/adduser', function (req, res) {
    res.status(200);
    res.header("Content-Type", "text/html");
    res.render('partials/adduser', { title: "Add User" });
});

/**
 * Add a new User to DB
 */
router.post('/adduser', [
    // handle username
    body('username')
        .isLength({ min: 1 })
        .withMessage('Username is required.')
        .custom(async function (username) {
            // i check if already exist user with this username
            var user = await Users.find({ 'username': username })
            if (user.length != 0 && user[0].username) {
                throw new Error('Username already in use');
            } else {
                return username;
            }

        }),
    // Sanitize (trim and escape) the username field.
    sanitizeBody('username').trim().escape(), // replace <, >, &, ', " and / with HTML entities and delete the space

    // email must be an email
    check('email')
        .isLength({ min: 1 })
        .withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address')
        .custom(async function (email) {
            // i check if already exist user with this email
            var mail = await Users.find({ 'email': email })
            if (mail.length != 0 && mail[0].email) {
                throw new Error('E-mail already in use');
            } else {
                return email;
            }

        }),
    // REF  https://stackoverflow.com/a/46013025/4700162   
    check('password')
        .isLength({ min: 1 })
        .withMessage('Passwords is required.')
        .custom((value, { req }) => {
            if (value !== req.body.passwordConfirm) {
                throw new Error('Password confirmation does not match password');
            } else {
                return value;
            }
        })

], (req, res) => {
    console.log(req.body);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());

        // https://stackoverflow.com/a/46373314/4700162
        return res.status(422).send({
            insertionError: true,
            errors: errors.array(),
            statusCode: 422
        });

    }

    Users.create(req.body, function (err, user) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
            });

        } else {
            sendEmail(req.body.email);
            res.status(200).send({ success: "Your registration was successful" });
        }

    });

});

/* ---------------------------------------------------
    UPDATE USER
----------------------------------------------------- */
// Find the value to update
router.get('/updateuser', function (req, res) {
    /**
     * Display all user from DB
     */
    Users.findById(req.session.userId, function (err, user) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
            });
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');   //TODO vedere se mettere una pagina di errore      
                return res.status(400).send({
                    insertionError: true,
                    errors: err.message,
                    statusCode: 400
                });
            } else {
                res.status(200);
                res.header("Content-Type", "text/html");
                // i wat send a notification of result of specific operation
                res.render('partials/updateuser', { title: "Update User", user: user });
            }
        }
    });
});

router.post('/updateuser', [
    // handle username
    body('username')
        .isLength({ min: 1 })
        .withMessage('Username is required.'),

    // Sanitize (trim and escape) the username field.
    sanitizeBody('username').trim().escape(), // replace <, >, &, ', " and / with HTML entities.

    // email must be an email
    check('email')
        .isLength({ min: 1 })
        .withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address'),

    // REF  https://stackoverflow.com/a/46013025/4700162 
    check('password')
        .isLength({ min: 1 })
        .withMessage('Passwords is required.')
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error('Password confirmation does not match password');
            } else {
                return value;
            }
        })

], (req, res) => {
    console.log(req.body);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            insertionError: true,
            errors: errors.array(),
            statusCode: 422
        });
    }

    Users.findById(req.body.id, function (err, user) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
            });
        } else {
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save(function (err, updatedTank) {
                if (err) {
                    return res.status(422).send({
                        insertionError: true,
                        errors: err,
                        statusCode: 11000
                    });

                } else {
                    Users.find()
                        .then((registrations) => {
                            res.status(200).send({ success: "Successful Update", users: registrations });
                        })
                        .catch(() => {
                            res.status(422).send({ msg: "I cannot show the user" });
                        });
                }
            });
        }
    });
});


/* ---------------------------------------------------
    DELETE USER
----------------------------------------------------- */
// GET request for display teh form of Deleting.
router.get('/deleteuser', function (req, res) {
    /**
     * Display all user from DB
     */
    Users.findById(req.session.userId, function (err, user) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
            });
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');   //TODO vedere se mettere una pagina di errore      
                return res.status(400).send({
                    insertionError: true,
                    errors: err.message,
                    statusCode: 400
                });
            } else {
                res.status(200);
                res.header("Content-Type", "text/html");
                // i wat send a notification of result of specific operation
                res.render('partials/deleteuser', { title: "Delete ", user: user });
            }
        }
    });
})

// POST request for send the data
router.post('/deleteuser', function (req, res) {
    Users.findById(req.body.id, function (err, user) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
            });
        } else {
            user.remove(function (err, updatedTank) {
                if (err) {
                    return res.status(422).send({
                        insertionError: true,
                        errors: err,
                        statusCode: 11000
                    });
                }
                else {
                    // Error: Can't set headers after they are sent.
                    res.end();
                }
            });
        }
    });

});

/* ---------------------------------------------------
    SHOW USER
----------------------------------------------------- */
// I see all people registred
router.get('/showuser', function (req, res) {
    Users.find()
        .then((registrations) => {
            res.render('partials/showuser', { title: "Show User - [User authenticated: " + req.user + "]", users: registrations });
        })
        .catch(() => { res.status(422).send({ msg: "Sorry! Something went wrong." }); });
});


/**
 * Nodemailer
 * REF: https://www.w3schools.com/nodejs/nodejs_email.asp
 *      https://nodemailer.com/about/
 */
async function sendEmail(email) {
    console.log(email)
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let account = await nodemailer.createTestAccount();



    var transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    let info = await transporter.sendMail({
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    });

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = router;
