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
var path = require("path");
const router = express.Router();
const auth = require('http-auth');
const { body, check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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