
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

router.post('/add', function (req, res) { 
    console.log(req.body);
    if(req.body.username && 
       req.body.email &&
       req.body.password &&
       req.body.passwordConfirm) {
           const registration = new Registration(req.body);
           registration.save()
           .then(() => {
                // res.redirect('/map');
                res.render('result', { success: true, title: 'REGISTRATION SUCCESS', message: 'Your registration was successful' });
           })
           .catch(() => {
                res.render('result', { success: false, title: 'REGISTRATION ERROR', message: 'Sorry! Something went wrong. Some field may already be in use' })
            });
       }else {
        res.render('result', { success: false, title: 'REGISTRATION ERROR', message: 'Make sure all fields have been filled and try again' })
       }
    // const registration = new Registration(req.body);
    // registration.save()
    //     .then(() => {
    //         res.render('result', { success: true, title: 'REGISTRATION SUCCESS', message: 'Your registration was successful' })
    //     })
    //     .catch(() => {
    //         res.render('result', { success: false, title: 'REGISTRATION ERROR', message: 'Sorry! Something went wrong.' })
    //     });
});


module.exports = router;

