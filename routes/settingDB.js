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

 
 
 
const User = mongoose.model('Users');
 
 /* ---------------------------------------------------
     We define the Setting of the Markers
 ----------------------------------------------------- */
 router.get('/settingMarkers', function (req, res) {
    User.findById(req.session.userId, function(err,user){
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
            });
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');     
                return res.status(400).send({
                    insertionError: true,
                    errors: err.message,
                    statusCode: 400
                });
            } else {
                res.status(200);
                res.header("Content-Type", "text/html");
                res.render('partials/settingMarkers', {title: 'Settings Markers', settings: user.settings});
            }
        }
    })
 });

/**
 * We define the metrics for the preference of experiment's threashold 
 */
 router.get('/settingMetrics', function (req, res){

        User.findById(req.session.userId, function(err,user){
            if (err) {
                return res.status(422).send({
                    insertionError: true,
                    errors: err,
                    statusCode: 11000
                });
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');   //TODO vedere se mettere una pagina di errore      
                    return res.status(400).send({
                        insertionError: true,
                        errors: err.message,
                        statusCode: 400
                    });
                } else {
                    res.status(200);
                    res.header("Content-Type", "text/html");
                    res.render('partials/settingMetrics', {title: 'Setting Metrics', settings: user.settings}); 
                }
            }
        })

 });

 /**
 * Update distance of Cluster
 */
 router.post('/settingCluster', function(req,res){
     console.log(req.session.userId);
    User.findById(req.session.userId, function (err, user) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
                });
        } else {
            
            console.log(user.settings.cluster.distance);
            console.log(req.body);
            user.settings.cluster.distance = req.body.cluster_distance;
            
            user.save(function (err, updatedTank) {
                if (err) {
                    console.log("ERRORE");
                    console.log(err);
                    return res.status(422).send({
                        insertionError: true,
                        errors: err,
                        statusCode: 11000
                        });

                } else {
                    console.log("SUCCESSO");
                    res.status(200).send({success: "Successful Update" });
                }
            });
        }
    });
 });

/**
 * Update Radius and Blur of HeatMap
 */
 router.post('/settingHeatmap', function(req,res){
    User.findById(req.session.userId, function (err, user) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
                });
        } else {
            user.settings.heatmap.radius = req.body.heatmap_radius;
            user.settings.heatmap.blur = req.body.heatmap_blur;
            
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


/**
 * Update a PDF of a specific user 
 */
 router.post('/settingPDR', function(req,res){
     // TODO sistemare l'utente quando si fa il merge con le session pdr
     User.findById(req.session.userId, function (err, user) {
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

 /**
  * Update a Delay of a specific user
  */
 router.post('/settingDelay', function(req,res){
    // TODO sistemare l'utente quando si fa il merge con le session delay
    User.findById(req.session.userId, function (err, user) {
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

/**
 * Update the Througput of a specific user
 */
router.post('/settingThroughput', function(req,res){
    // TODO sistemare l'utente quando si fa il merge con le session throughput
    User.findById(req.session.userId, function (err, user) {
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