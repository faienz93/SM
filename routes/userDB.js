
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
        
        Registration.create(req.body, function (err, user) {
            
            if (err) {
                req.flash('danger', "Sorry! Something went wrong. Some field may already be in use.");
                res.redirect('/');
                
             
            }else {
                req.flash('success', "Your registration was successful");            
                res.redirect('/');
            }
            
          });
       }else {
        req.flash('danger', "Make sure all fields have been filled or password not Matching. Try again.");            
        res.redirect('/');
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
                if (err) {
                    req.flash('danger', err.message);
                    res.redirect('/'); 
                }else {
                    user.username = req.body.username;
                    user.email = req.body.email;
                    user.password = req.body.password;
                    user.save(function (err, updatedTank) {
                        if (err) {
                            req.flash('danger', err.message);
                            res.redirect('/'); 
                        }else {
                            req.flash('success', "Your updating was successful");            
                            res.redirect('/');
                        }                        
                    });
                }

                
              });


    }else {
        req.flash('danger', "Make sure all fields have been filled or password not Matching. Try again.");
        res.redirect('/');  
       }
    
});


/**
 * Delete user
 */
router.post('/delete', function(req,res){
    console.log(req.body.deleteUser);

    var user = JSON.parse(req.body.deleteUser);
    
    Registration.findById(user._id, function (err, user) {
        if (err) {
            req.flash('danger', err.message);
            res.redirect('/'); 
        }else {
            user.remove(function (err, updatedTank) {
                if (err) {
                    req.flash('danger', err.message);
                    res.redirect('/'); 
                }else {
                    req.flash('success', "Your deleting was successful");            
                    res.redirect('/');
                }   
              });
        }        
      });
   
});


module.exports = router;

