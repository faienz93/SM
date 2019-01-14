/**
 * ===========================================================================
 * File: TestDB.js 
 * Author: Antonio Faienza
 * This file manages the insertion, removal, updating of a test's data
 * ===========================================================================
 */

 // dependency
var express = require("express");
const mongoose = require('mongoose');
var testSchema = require('mongoose').model('Test').schema
var path = require("path");
const router = express.Router();
const auth = require('http-auth');
const { body, check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Validator = require('jsonschema').Validator;
var v = new Validator();

const Test = mongoose.model('Test');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

basic.on('success', (result, req) => {
    console.log(`User authenticated: ${result.user}`);
});




/* ---------------------------------------------------
    ADD TEST
----------------------------------------------------- */
router.get('/addtest', function (req, res) {
    res.status(200);
    res.header("Content-Type", "text/html");
    res.render('partials/addtest', {titleSingleTest: "Add Test",titleMultiTest: "Add Multi Test"});
});

router.post('/addtest',function (req, res) {
    
    var instance = "dasdasdasd";
  var schema = {"type": "number"};
//   console.log(v.validate(instance, schema));
var prova = v.validate(instance,schema);
console.log(prova);
console.log(prova.errors);
console.log(prova.throwError);

    // console.log("VEDIAMO ADESSO COSA STAMPA");
    // console.log(req.body.multitest);
    // console.log(typeof req.body.multitest);

    // var stringBody = req.body.multitest;
    // var jsonBody = JSON.parse(stringBody);
    // console.log(jsonBody)
    // console.log(typeof jsonBody);
    // console.log("=================================");
    
    // console.log(v.validate(jsonBody, testSchema));
    // Test.create(jsonBody, function (err, user) {
    //     if (err) {
    //         console.log(err)

    //     } else {
    //         // res.status(200).send({success: "Your registration was successful"});
    //         console.log("SUCCESS");
    //     }
    // });
})

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