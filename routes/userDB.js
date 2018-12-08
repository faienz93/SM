
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
               .withMessage('Username is required.'),
    // email must be an email
    check('email')
                .isLength({ min: 1 })
                .withMessage('Email is required.')
                .isEmail().withMessage('Please provide a valid email address'),
    check('password')
                .isLength({ min: 1 })
                .withMessage('Passwords is required.')
                .custom((value, { req }) => {
                    if (value !== req.body.passwordConfirm) {
                      throw new Error('Password confirmation does not match password');
                    // REF  https://stackoverflow.com/a/46013025/4700162                      
                    }else {
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
                res.redirect('/');
                
             
            }else {
                req.flash('success', "Your registration was successful");            
                res.redirect('/');
            }
            
          });
  
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

