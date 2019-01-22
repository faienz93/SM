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
        console.log("Prima dell'autenticate");
        Users.authenticate(req.body.email && req.body.password, function (error, user){
            console.log("sto quaaaaaaaaaaaaaaaaaaa");
            if(error || !user){
                var err = new Error('Wrong email or password');
                err.status = 401; 
                return next(err);
            }else {
                req.session.userId = user._id;
                console.log("===========================");
                console.log(req.session.userId);
                console.log("===========================");
                return redirect('/login')
            }
        })
    }else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
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