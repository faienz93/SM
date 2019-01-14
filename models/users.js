/*
 * ===========================================================================
 * File: Users.js 
 * Author: Antonio Faienza
 * Desc: This file allow to defines the Database Schema. Schemas allow you to 
 * define the fields stored in each document along with their type, validation
 * requirements and default values. 
 * ===========================================================================
 */

 const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
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

 module.exports = mongoose.model('Users', userSchema);