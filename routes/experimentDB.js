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

router.post('/addexperiment',function (req, res) {
    
//     var instance = "dasdasdasd";
//   var schema = {"type": "number"};
// //   console.log(v.validate(instance, schema));
// var prova = v.validate(instance,schema);
// console.log(prova);
// console.log(prova.errors);
// console.log(prova.throwError);

    console.log("VEDIAMO ADESSO COSA STAMPA");
    // console.log(req.body.multiexperiments);
    // console.log(typeof req.body.multiexperiments);

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