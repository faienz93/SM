/**
 * ===========================================================================
 * File: ExperimentDB.js 
 * Author: Antonio Faienza
 * This file manages the insertion, removal, updating of a Experiment's data
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



const Experiment = mongoose.model('Experiment');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

basic.on('success', (result, req) => {
    console.log(`User authenticated: ${result.user}`);
});




/* ---------------------------------------------------
    ADD TEST
----------------------------------------------------- */
router.get('/addexperiment', function (req, res) {
    res.status(200);
    res.header("Content-Type", "text/html");
    res.render('partials/addexperiment', {titleSingleExperiment: "Add Experiment",titleMultiExperiment: "Add Multi Experiment"});
});

/**
 * Add Experiment from JSON
 */
router.post('/addexperiment',function (req, res) {
    var parseJsonExperiment = parseJson(req.body.multiexperiments);
    if(parseJsonExperiment[0]==200){

        Experiment.create(parseJsonExperiment[1], function (err, user) {
        if (err) {
            console.log(err.name + " " + err.message)
            return res.status(422).send({
                insertionError: true,
                errors: err.name + " " + err.message,
                statusCode: 400
                });

        } else {
            res.status(200).send({success: "Experiment added correctly"});
        }
        });
    }else if(parseJsonExperiment[0]==400){       
        return res.status(422).send({
            insertionError: true,
            errors: parseJsonExperiment[1],
            statusCode: 400
            });
    }
})

/**
 * Add Experiment from form
 */
router.post('/addexperimentform', [

    check('latitude')
        .isLength({ min: 1 })
        .withMessage('Latitude is required.')
        .isNumeric().withMessage('Please provide an numeric value for the latitude'),

    check('longitude')
        .isLength({ min: 1 })
        .withMessage('Longitude is required.')
        .isNumeric().withMessage('Please provide an numeric value for the longitude'),
        
    check('pdr')
        .isNumeric()
        .withMessage('Please provide an numeric value for the Packet Delivery Ratio')
        .custom((value, { req }) => {
            if (value < 0 || value > 1 ) {
                throw new Error('Please provide a value between 0 and 1 for the Packet Delivery Ratio');                   
            } else {
                return value;
            }
        }),

    check('delay')
        .isNumeric()
        .withMessage('Please provide an numeric value for the Delay'),

    check('throughput')
        .isNumeric()
        .withMessage('Please provide an numeric value for the Throughput')
        .custom((value, { req }) => {
            if (value < 0 || value > 1 ) {
                throw new Error('Please provide a value between 0 and 1 for the Throughput');                   
            } else {
                return value;
            }
        }),
    
    // TODO fare configurazione 
    
    body('name')
    .isLength({ min: 1 })
    .withMessage('Experiment is required.')
    .custom(async function (exp) {
        // i check if already exist experiment with this name
        var experiment = await Experiment.find({ 'name': exp })
        if (experiment.length != 0 && experiment[0].name) {
            throw new Error('Experiment already in use');
        } else {
            return experiment;
        }
    }),
    // Sanitize (trim and escape) the experiment field.
    sanitizeBody('name').trim().escape(), // replace <, >, &, ', " and / with HTML entities and delete the space

    check('latitudeServer')
        .isLength({ min: 1 })
        .withMessage('Latitude Server is required.')
        .isNumeric().withMessage('Please provide an numeric value for the latitude of the server'),

    check('longitudeServer')
        .isLength({ min: 1 })
        .withMessage('Longitude Server is required.')
        .isNumeric().withMessage('Please provide an numeric value for the longitude of the server'),

], (req, res) => {
    console.log(req.body);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());

        // https://stackoverflow.com/a/46373314/4700162
        return res.status(422).send({
            insertionError: true,
            errors: errors.array(),
            statusCode: 422
            });
        
    }

    Experiment.create(req.body, function (err, user) {
        if (err) {
            console.log(err.name + " " + err.message)
            return res.status(422).send({
                insertionError: true,
                errors: err.name + " " + err.message,
                statusCode: 400
                });

        } else {
            res.status(200).send({success: "Experiment added correctly"});
        }
        });

});

/**
 * Return all experiments list
 */
router.get('/getexperiments', function (req, res) {    
    Experiment.find({}, function(err, experiment) {        
        var experimentMap = [];    
        experiment.forEach(function(test) {              
            experimentMap.push(test);
        });   
        res.status(200).send(experimentMap);          
      });
});

/**
 * This function return a JSON. If it malformed it resurn a status code 400
 * and the error
 * @method parseJSON
 * @param {String} - The string to convert
 * REF: https://stackoverflow.com/a/7574300/4700162
 *      https://stackoverflow.com/a/36404533/4700162
 *      https://stackoverflow.com/a/14278407/4700162
 */
function parseJson(str) {
     
    try {
        var res = [];
        res.push(200);
        res.push(JSON.parse(str));
        return res;
    }
    catch (err) {
        var res = [];
        res.push(400);
        res.push(err.name + " " + err.message);
        return res;
    }
}

/* ---------------------------------------------------
    UPDATE TEST
----------------------------------------------------- */


/* ---------------------------------------------------
    UPDATE TEST
----------------------------------------------------- */


/* ---------------------------------------------------
    SHOW TEST
----------------------------------------------------- */

module.exports = router;