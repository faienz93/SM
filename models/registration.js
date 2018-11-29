/*
 * ===========================================================================
 * File: Registration.js 
 * Author: Antonio Faienza
 * Desc: This file allow to defines the Database Schema. Schemas allow you to 
 * define the fields stored in each document along with their type, validation
 * requirements and default values. 
 * ===========================================================================
 */

 const mongoose = require('mongose');

 const registrationSchema = new mongoose.Schema({
     name: {
         type: String,
         trim: true
     },
     email: {
         type: String,
         trim: true
     }
 });

 module.exports = mongoose.model('Registration', registrationSchema);