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
 
 
 
const User = mongoose.model('Users');
 
 
 
 
 /* ---------------------------------------------------
     We define the Setting of the Markers
 ----------------------------------------------------- */
 router.get('/settingMarkers', function (req, res) {
     res.status(200);
     res.header("Content-Type", "text/html");
     res.render('partials/settingMarkers', {title: 'Settings Markers'});
 });

/**
 * We define the metrics for the preference of experiment's threashold 
 */
 router.get('/settingMetrics', function (req, res){
   
    User.find()
        .then((users) => {
            res.status(200);
            res.header("Content-Type", "text/html");
             // TODO nel merge con le sessioni specificare solo quello della sessione attuale
            res.render('partials/settingMetrics', {title: 'Setting Metrics', settings: users[0].settings}); 
        })
        .catch(() => {
            res.status(422).send({msg: "I cannot show the user"});
        })
 });


 router.post('/settingPDR', function(req,res){
     // TODO sistemare l'utente quando si fa il merge con le session pdr
     User.findById("5c6964a67db46f4497d322a0", function (err, user) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
                });
        } else {
            user.settings.pdr.interval_x0x1.color = req.body.pdr_interval_x0x1_color;
            user.settings.pdr.interval_x0x1.threashold = req.body.pdr_interval_x0x1_threashold;

            user.settings.pdr.interval_x1x2.color = req.body.pdr_interval_x1x2_color;
            user.settings.pdr.interval_x1x2.threashold = req.body.pdr_interval_x1x2_threashold;

            user.settings.pdr.interval_x2x3.color = req.body.pdr_interval_x2x3_color;
            user.settings.pdr.interval_x2x3.threashold = req.body.pdr_interval_x2x3_threashold;

            user.settings.pdr.interval_x3x4.color = req.body.pdr_interval_x3x4_color;
            
            user.save(function (err, updatedTank) {
                if (err) {
                    return res.status(422).send({
                        insertionError: true,
                        errors: err,
                        statusCode: 11000
                        });

                } else {
                    res.status(200).send({success: "Successful Update" });
                }
            });
        }
    });
 });

 router.post('/settingDelay', function(req,res){
    // TODO sistemare l'utente quando si fa il merge con le session delay
    User.findById("5c6964a67db46f4497d322a0", function (err, user) {
       if (err) {
           return res.status(422).send({
               insertionError: true,
               errors: err,
               statusCode: 11000
               });
       } else {
           user.settings.delay.interval_x0x1.color = req.body.delay_interval_x0x1_color;
           user.settings.delay.interval_x0x1.threashold = req.body.delay_interval_x0x1_threashold;

           user.settings.delay.interval_x1x2.color = req.body.delay_interval_x1x2_color;
           user.settings.delay.interval_x1x2.threashold = req.body.delay_interval_x1x2_threashold;

           user.settings.delay.interval_x2x3.color = req.body.delay_interval_x2x3_color;
           user.settings.delay.interval_x2x3.threashold = req.body.delay_interval_x2x3_threashold;

           user.settings.delay.interval_x3x4.color = req.body.delay_interval_x3x4_color;
           
           user.save(function (err, updatedTank) {
               if (err) {
                   return res.status(422).send({
                       insertionError: true,
                       errors: err,
                       statusCode: 11000
                       });

               } else {
                   res.status(200).send({success: "Successful Update" });
               }
           });
       }
   });
});

router.post('/settingThroughput', function(req,res){
    // TODO sistemare l'utente quando si fa il merge con le session throughput
    User.findById("5c6964a67db46f4497d322a0", function (err, user) {
       if (err) {
           return res.status(422).send({
               insertionError: true,
               errors: err,
               statusCode: 11000
               });
       } else {
           user.settings.throughput.interval_x0x1.color = req.body.throughput_interval_x0x1_color;
           user.settings.throughput.interval_x0x1.threashold = req.body.throughput_interval_x0x1_threashold;

           user.settings.throughput.interval_x1x2.color = req.body.throughput_interval_x1x2_color;
           user.settings.throughput.interval_x1x2.threashold = req.body.throughput_interval_x1x2_threashold;

           user.settings.throughput.interval_x2x3.color = req.body.throughput_interval_x2x3_color;
           user.settings.throughput.interval_x2x3.threashold = req.body.throughput_interval_x2x3_threashold;

           user.settings.throughput.interval_x3x4.color = req.body.throughput_interval_x3x4_color;
           
           user.save(function (err, updatedTank) {
               if (err) {
                   return res.status(422).send({
                       insertionError: true,
                       errors: err,
                       statusCode: 11000
                       });

               } else {
                   res.status(200).send({success: "Successful Update" });
               }
           });
       }
   });
});


 module.exports = router;