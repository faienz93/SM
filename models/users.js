/*
 * ===========================================================================
 * File: Registration.js 
 * Author: Antonio Faienza
 * Desc: This file allow to defines the Database Schema. Schemas allow you to 
 * define the fields stored in each document along with their type, validation
 * requirements and default values. 
 * ===========================================================================
 */

 const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');

 const registrationSchema = new mongoose.Schema({
     username: {
         type: String,
         unique: true,
         required: true,
         trim: true
     },
     email: {
         type: String,
         unique: true,
         required: true,
         trim: true
     },
     password: {
         type: String,
         trim: true
     },
     datetime: {
         type: Date,
         default: Date.now
     }
 });

 //hashing a password before saving it to the database
 registrationSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err,hash){
        if(err){
            return next(err);
        }
        user.password = hash;
        next();
    })
    
 });

 module.exports = mongoose.model('Users', registrationSchema);