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
                    var err = new Error('Not authorized! Go back!');        
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
    User.findByIdAndUpdate(req.session.userId,{$set:{'settings.cluster.distance': req.body.cluster_distance   }},{ runValidators: true, new: true }, function(err,user){
        if (err) {
                return res.status(422).send({
                    insertionError: true,
                    errors: err,
                    statusCode: 11000
                    });

            } else {
                res.status(200).send({success: "Successful Update", user: user });
            }
    });
 });

/**
 * Update Radius and Blur of HeatMap
 */
 router.post('/settingHeatmap', function(req,res){
    User.findByIdAndUpdate(req.session.userId,{$set:{'settings.heatmap.radius': req.body.heatmap_radius, 'settings.heatmap.blur':req.body.heatmap_blur }},{ runValidators: true, new: true}, function(err,user){
        if (err) {
                return res.status(422).send({
                    insertionError: true,
                    errors: err,
                    statusCode: 11000
                    });
            } else {      
                res.status(200).send({success: "Successful Update",user: user });
            }
    });
});


/**
 * Update a PDF of a specific user 
 */
 router.post('/settingPDR', function(req,res){  
    User.findByIdAndUpdate(req.session.userId,{$set:{'settings.pdr.interval_x0x1.color' : req.body.pdr_interval_x0x1_color, 
                                                    'settings.pdr.interval_x0x1.threashold' : req.body.pdr_interval_x0x1_threashold,
                                                    'settings.pdr.interval_x1x2.color' : req.body.pdr_interval_x1x2_color,
                                                    'settings.pdr.interval_x1x2.threashold' : req.body.pdr_interval_x1x2_threashold,
                                                    'settings.pdr.interval_x2x3.color' : req.body.pdr_interval_x2x3_color,
                                                    'settings.pdr.interval_x2x3.threashold' : req.body.pdr_interval_x2x3_threashold,
                                                    'settings.pdr.interval_x3x4.color' : req.body.pdr_interval_x3x4_color  }},{ runValidators: true, new: true }, function(err,user){
        if (err) {
                return res.status(422).send({
                    insertionError: true,
                    errors: err,
                    statusCode: 11000
                    });
            } else {                
                res.status(200).send({success: "Successful Update",user:user });
            }
    });
 });

 /**
  * Update a Delay of a specific user
  */
 router.post('/settingDelay', function(req,res){
    User.findByIdAndUpdate(req.session.userId,{$set:{'settings.delay.interval_x0x1.color' : req.body.delay_interval_x0x1_color, 
                                                    'settings.delay.interval_x0x1.threashold' : req.body.delay_interval_x0x1_threashold,
                                                    'settings.delay.interval_x1x2.color' : req.body.delay_interval_x1x2_color,
                                                    'settings.delay.interval_x1x2.threashold' : req.body.delay_interval_x1x2_threashold,
                                                    'settings.delay.interval_x2x3.color' : req.body.delay_interval_x2x3_color,
                                                    'settings.delay.interval_x2x3.threashold' : req.body.delay_interval_x2x3_threashold,
                                                    'settings.delay.interval_x3x4.color' : req.body.delay_interval_x3x4_color  }},
                                                        { runValidators: true, new: true }, function(err,user){
            if (err) {
                    return res.status(422).send({
                        insertionError: true,
                        errors: err,
                        statusCode: 11000
                        });
                } else {                
                    res.status(200).send({success: "Successful Update",user: user });
                }
        });
});

/**
 * Update the Througput of a specific user
 */
router.post('/settingThroughput', function(req,res){
   User.findByIdAndUpdate(req.session.userId,{$set:{'settings.throughput.interval_x0x1.color' : req.body.throughput_interval_x0x1_color, 
                                                    'settings.throughput.interval_x0x1.threashold' : req.body.throughput_interval_x0x1_threashold,

                                                    'settings.throughput.interval_x1x2.color' : req.body.throughput_interval_x1x2_color,
                                                    'settings.throughput.interval_x1x2.threashold' : req.body.throughput_interval_x1x2_threashold,

                                                    'settings.throughput.interval_x2x3.color' : req.body.throughput_interval_x2x3_color,
                                                    'settings.throughput.interval_x2x3.threashold' : req.body.throughput_interval_x2x3_threashold,

                                                    'settings.throughput.interval_x3x4.color' : req.body.throughput_interval_x3x4_color  }},
                                                        { runValidators: true, new: true }, function(err,user){
            if (err) {
                    return res.status(422).send({
                        insertionError: true,
                        errors: err,
                        statusCode: 11000
                        });
                } else {                
                    res.status(200).send({success: "Successful Update", user:user });
                }
        });
});


 module.exports = router;