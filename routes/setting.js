/**
 * ===========================================================================
 * File: Setting.js 
 * Author: Antonio Faienza
 * This file open a setting partial
 * ===========================================================================
 */

 // dependency
 var express = require("express");
 const mongoose = require('mongoose');
 
 var path = require("path");
 const router = express.Router();
 const auth = require('http-auth');
 const { body, check, validationResult } = require('express-validator/check');
 const { sanitizeBody } = require('express-validator/filter');
 
 
 
//  const Experiment = mongoose.model('Experiment');
 
//  const basic = auth.basic({
//      file: path.join(__dirname, '../users.htpasswd'),
//  });
 
//  basic.on('success', (result, req) => {
//      console.log(`User authenticated: ${result.user}`);
//  });
 
 
 
 
 /* ---------------------------------------------------
     ADD TEST
 ----------------------------------------------------- */
 router.get('/settings', function (req, res) {
     res.status(200);
     res.header("Content-Type", "text/html");
     res.render('partials/settings', {title: 'Settings'});
 });


 module.exports = router;