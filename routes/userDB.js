
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

/**
 * Add a new User to DB
 */
router.post('/add', function (req, res) { 
    console.log(req.body);
    if(req.body.username && 
       req.body.email &&
       req.body.password &&
       req.body.passwordConfirm && req.body.password == req.body.passwordConfirm) {
        //    const registration = new Registration(req.body);

        //    registration.save()
        //    .then(() => {
        //         res.render('result', { success: true, title: 'REGISTRATION SUCCESS', message: 'Your registration was successful' });
        //    })
        //    .catch(() => {
        //        console.log(err);
        //         res.render('result', { success: false, title: 'REGISTRATION ERROR', message: 'Sorry! Something went wrong. Some field may already be in use.' })
        //     });
        Registration.create(req.body, function (err, user) {
            
            if (err) res.send(err);
            // res.send(user);
            // saved!
            req.flash('danger', "CIAO COME STAI");
            
            res.redirect('map');
          });
       }else {
        res.render('result', { success: false, title: 'REGISTRATION ERROR', message: 'Make sure all fields have been filled or password not Matching. Try again.' })
       }
});

/**
 * Find the value to update
 */
router.post('/update', function (req, res) { 
    console.log(req.body);
    if(req.body.username && 
        req.body.email &&
        req.body.password &&
        req.body.confirmPassword && req.body.password == req.body.confirmPassword) {
            
            Registration.findById(req.body.id, function (err, user) {
                if (err) res.render('result', { success: false, title: 'FINDING ERROR', message: err })

                user.username = req.body.username;
                user.email = req.body.email;
                user.password = req.body.password;
                user.save(function (err, updatedTank) {
                  if (err) res.render('result', { success: false, title: 'UPDATE ERROR', message: err })
                    // res.send(updatedTank);
                    res.render('result', { success: true, title: 'UPDATE SUCCESS', message: 'Your updating was successful '});
                });
              });


    }else {
        res.render('result', { success: false, title: 'REGISTRATION ERROR', message: 'Make sure all fields have been filled or password not Matching. Try again.' })
       }
    
});


/**
 * Delete user
 */
router.post('/delete', function(req,res){
    console.log(req.body.deleteUser);

    var user = JSON.parse(req.body.deleteUser);
    
    Registration.findById(user._id, function (err, user) {
        if (err) res.render('result', { success: false, title: 'FINDING ERROR', message: err })

        
        user.remove(function (err, updatedTank) {
          if (err) res.render('result', { success: false, title: 'DELETING ERROR', message: err })
            // res.send(updatedTank);
            res.render('result', { success: true, title: 'DELETE SUCCESS', message: 'Your deleting was successful '});
        });
      });
   
});


module.exports = router;

