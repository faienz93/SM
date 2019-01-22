/**
 * ===========================================================================
 * File: UserDB.js 
 * Author: Antonio Faienza
 * TODO description
 * ===========================================================================
 */


var express = require('express');
const router = express.Router();


// define reading of stating file
// app.use(express.static(path.join(__dirname, '/')));



router.get('/', function(req, res) {
    // console.log(req.session);
    res.render('index', {title: "SM - Mobile System"});
});



function requiresLogin(req,res,next){
    if(req.session && req.session.userId){
        return next();
    }else {
        var err = new Error('You must be logged in to view this page.');
        err.status(401);
        return next(err);
    }
}


module.exports = router;