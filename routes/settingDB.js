/**
 * ===========================================================================
 * File: SettingDB.js 
 * Author: Antonio Faienza
 * This file open a Configuration partial that is saved into User Configurations
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
     We define the Setting of the Markers
 ----------------------------------------------------- */
 router.get('/settingMarkers', function (req, res) {
     res.status(200);
     res.header("Content-Type", "text/html");
     res.render('partials/settingMarkers', {title: 'Settings Markers'});
 });


 router.get('/settingMetrics', function (req, res){
    res.status(200);
    res.header("Content-Type", "text/html");
    res.render('partials/settingMetrics', {title: 'Setting Metrics'}); 
 });


 module.exports = router;