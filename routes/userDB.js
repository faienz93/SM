
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
var path = require("path");
const router = express.Router();
var Registration = mongoose.model('Registration');
const { body, check, validationResult } = require('express-validator/check');

/**
 * Add a new User to DB
 */
router.post('/add', [
    // handle username
    body('username')
        .isLength({ min: 1 })
        .withMessage('Username is required.')
        .custom(async function (username) {
            // i check if already exist user with this username
            var user = await Registration.find({ 'username': username })
            if (user.length != 0 && user[0].username) {
                throw new Error('Username already in use');
            } else {
                return username;
            }

        }),

    // email must be an email
    check('email')
        .isLength({ min: 1 })
        .withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address')
        .custom(async function (email) {
            // i check if already exist user with this email
            var mail = await Registration.find({ 'email': email })
            if (mail.length != 0 && mail[0].email) {
                throw new Error('E-mail already in use');
            } else {
                return email;
            }
        
        }),
    check('password')
        .isLength({ min: 1 })
        .withMessage('Passwords is required.')
        .custom((value, { req }) => {
            if (value !== req.body.passwordConfirm) {
                throw new Error('Password confirmation does not match password');
                // REF  https://stackoverflow.com/a/46013025/4700162                      
            } else {
                return value;
            }
        })

], (req, res) => {
    console.log(req.body);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    Registration.create(req.body, function (err, user) {

        if (err) {
            console.log(err);
            req.flash('danger', "Sorry! Something went wrong. Some field may already be in use.");
            res.redirect('/map');


        } else {
            req.flash('success', "Your registration was successful");
            res.redirect('/map');
        }

    });

});

/**
 * Find the value to update
 */
router.post('/update', [
    // handle username
    body('username')
        .isLength({ min: 1 })
        .withMessage('Username is required.'),
        // .custom(async function (username) {
        //     // i check if already exist user with this username
        //     var user = await Registration.find({ 'username': username })
        //     console.log("LUNGHEZZA " + user.length);
        //     if (user.length != 0 && user[0].username) {
        //         throw new Error('Username already in use');
        //     } else {
        //         return username;
        //     }
        // }),

    // email must be an email
    check('email')
        .isLength({ min: 1 })
        .withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address')
        .custom(async function (email) {
            // i check if already exist user with this email
            var mail = await Registration.find({ 'email': email })
            if (mail.length != 0) {
                if (mail[0].email) {
                    throw new Error('E-mail already in use');
                } else {
                    return email;
                }
            }
        }),
    check('password')
        .isLength({ min: 1 })
        .withMessage('Passwords is required.')
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error('Password confirmation does not match password');
                // REF  https://stackoverflow.com/a/46013025/4700162                      
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
        return res.status(422).json({ errors: errors.array() });
    }

    Registration.findById(req.body.id, function (err, user) {
        if (err) {
            req.flash('danger', err.message);
            res.redirect('/map');
        } else {
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save(function (err, updatedTank) {
                if (err) {
                    req.flash('danger', err.message);
                    res.redirect('/map');
                } else {
                    req.flash('success', "Your updating was successful");
                    res.redirect('/map');
                }
            });
        }
    });
});


/**
 * Delete user
 */
router.post('/delete', function (req, res) {
    console.log(req.body.deleteUser);

    var user = JSON.parse(req.body.deleteUser);

    Registration.findById(user._id, function (err, user) {
        if (err) {
            req.flash('danger', err.message);
            res.redirect('/formDeleteUser');
        } else {
            user.remove(function (err, updatedTank) {
                if (err) {
                    req.flash('danger', err.message);
                    res.redirect('/formDeleteUser');
                } else {
                    req.flash('success', "Your deleting was successful");
                    res.redirect('/formDeleteUser');
                }
            });
        }
    });

});


module.exports = router;

