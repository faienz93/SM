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
const router = express.Router();
const { body, check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const Experiment = mongoose.model('Experiment');






/* ---------------------------------------------------
    ADD TEST
----------------------------------------------------- */
router.get('/addexperiment', function (req, res) {
    res.status(200);
    res.header("Content-Type", "text/html");
    res.render('partials/addexperiment', { titleSingleExperiment: "Add Experiment", titleMultiExperiment: "Add Multi Experiment" });
});

/**
 * Add Experiment from JSON
 */
router.post('/addexperiment', function (req, res) {
    var parseJsonExperiment = parseJson(req.body.multiexperiments);
    if (parseJsonExperiment[0] == 200) {

        Experiment.create(parseJsonExperiment[1], function (err, exp) {

            if (err) {
                console.log(err.name + " " + err.message)
                return res.status(422).send({
                    insertionError: true,
                    errors: err.name + " " + err.message,
                    statusCode: 400
                });

            } else {
                res.status(200).send({ success: "Experiment added correctly" });
            }
        });

    } else if (parseJsonExperiment[0] == 400) {
        return res.status(422).send({
            insertionError: true,
            errors: parseJsonExperiment[1],
            statusCode: 400
        });
    }
})

/**
 * Add Experiment from FORM
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
            if (value < 0 || value > 100) {
                throw new Error('Please provide a value between 0 and 100 for the Packet Delivery Ratio');
            } else {
                return value;
            }
        }),

    check('delay')
        .isNumeric()
        .withMessage('Please provide an numeric value for the Delay'),

    check('throughput')
        .isNumeric(),


    body('name')
        .isLength({ min: 1 })
        .withMessage('Experiment name is required.')
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
        .isNumeric().withMessage('Please provide an numeric value for the longitude of the server')

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
            res.status(200).send({ success: "Experiment added correctly" });
        }
    });

});

/**
 * Return all experiments list
 */
router.get('/getexperiments', function (req, res) {
    Experiment.find({}, function (err, experiment) {
        var experimentMap = [];
        experiment.forEach(function (test) {
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
router.get('/updateexperiment', function (req, res) {
    /**
     * Display all Experiments from DB
     */
    Experiment.find()
        .then((exp) => {
            res.status(200);
            res.header("Content-Type", "text/html");
            // i wat send a notification of result of specific operation
            res.render('partials/updateexperiment', { title: "Update Experiment", experiments: exp });

        })
        .catch(() => {
            res.status(422).send({ msg: "I cannot show the Experiment" });
        });
});

router.post('/updateexperiment', [
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
            if (value < 0 || value > 100) {
                throw new Error('Please provide a value between 0 and 100 for the Packet Delivery Ratio');
            } else {
                return value;
            }
        }),

    check('delay')
        .isNumeric()
        .withMessage('Please provide an numeric value for the Delay'),

    check('throughput')
        .isNumeric(),


    body('name')
        .isLength({ min: 1 })
        .withMessage('Experiment name is required.'),

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

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            insertionError: true,
            errors: errors.array(),
            statusCode: 422
        });
    }

    Experiment.findById(req.body.id, function (err, experiment) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
            });
        } else {
            // console.log(req.body);
            experiment.latitude = req.body.latitude;
            experiment.longitude = req.body.longitude;
            experiment.metrics.pdr = req.body.pdr;
            experiment.metrics.delay = req.body.delay;
            experiment.metrics.throughput = req.body.throughput;
            experiment.name = req.body.name;
            experiment.latitudeServer = req.body.latitudeServer;
            experiment.longitudeServer = req.body.longitudeServer;
            experiment.save(function (err, user) {
                if (err) {
                    return res.status(422).send({
                        insertionError: true,
                        errors: err,
                        statusCode: 11000
                    });

                } else {
                    Experiment.find()
                        .then((exp) => {
                            res.status(200).send({ success: "Successful Update", experiments: exp });

                        })
                        .catch(() => {
                            res.status(422).send({ msg: "I cannot show the Experiment" });
                        });


                }
            });
        }
    });
});

/* ---------------------------------------------------
    UPDATE TEST
----------------------------------------------------- */
router.get('/deleteexperiment', function (req, res) {
    /**
     * Display all Experiments from DB
     */
    Experiment.find()
        .then((exp) => {
            res.status(200);
            res.header("Content-Type", "text/html");
            // i wat send a notification of result of specific operation
            res.render('partials/deleteexperiment', { title: "Delete Experiment", experiments: exp });

        })
        .catch(() => {
            res.status(422).send({ msg: "I cannot show the Experiment" });
        });
});

router.post('/deleteexperiment', function (req, res) {
    var experiment = JSON.parse(req.body.deleteExperiment);
    Experiment.findByIdAndRemove(experiment._id, function (err, result) {
        if (err) {
            return res.status(422).send({
                insertionError: true,
                errors: err,
                statusCode: 11000
            });
        }
        else {

            Experiment.find()
                .then((exp) => {
                    res.status(200).send({ success: "Cancellation Successful", experiments: exp });
                })
                .catch(() => {
                    res.status(422).send({ msg: "I cannot show the Experiment" });
                });
        }
    });

});

/* ---------------------------------------------------
    SHOW TEST
----------------------------------------------------- */
router.get('/showexperiment', function (req, res) {
    Experiment.find()
        .then((exp) => {
            res.render('partials/showexperiment', { title: "Show Experiment", experiments: exp });
        })
        .catch(() => { res.status(422).send({ msg: "Sorry! Something went wrong." }); });
});

module.exports = router;