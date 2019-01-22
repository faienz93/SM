/**
 * ===========================================================================
 * File: session.js 
 * Author: Antonio Faienza
 * This file manages the session, in particular: 
 * - login
 * - logout
 * ===========================================================================
 */

 var express = require('express');
 const router = express.Router();
 const mongoose = require('mongoose');

 const Users = mongoose.model('Users');

/**
 * Define Login
 */
 router.get('/login', function (req, res, next) {
    res.render('login', {title: "SM - Login" });
    // if you have layout you can specify if you want to use him
    // res.render('login', {layout:false, title: "HELLO WORLD"});
});


router.post('/login', function(req,res,next){
    console.log(req.body);
    if(req.body.email && req.body.password){
        Users.authenticate(req.body.email, req.body.password, function (error, user){
            if(error || !user){
                return res.status(401).send({
                    insertionError: true,
                    errors: error.message,
                    statusCode: 401
                    });
            }else {
                req.session.userId = user._id;
                return res.redirect('/')
            }
        })
    }else {       
        var err = new Error('All fields required.');           
        return res.status(400).send({
                insertionError: true,
                errors: err.message,
                statusCode: 400
                });
    }
})

/**
 * Define Logout
 */
router.get('/logout', function(req, res,next){
    if(req.session){
        //delete session object
        req.session.destroy(function(err){
            if(err){
                return next(err);
            }else {
                return res.redirect('/login');
            }
        });
    }
});


module.exports = router;