/**
 * ===========================================================================
 * File: UserDB.js 
 * Author: Antonio Faienza
 * TODO description
 * ===========================================================================
 */


var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = mongoose.model('Users');


// define reading of stating file
// app.use(express.static(path.join(__dirname, '/')));



router.get('/', function(req, res) {    
    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                return next(error);
            }else {
                if(user === null){
                    // var err = new Error('Not authorized! Go back!');        
                    // return res.status(400).send({
                    //         insertionError: true,
                    //         errors: err.message,
                    //         statusCode: 400
                    //         });
                    // res.render('login', {title: "SM - Login", prova: 'Not authorized! Go back!'});
                    req.flash('danger', 'Not authorized! Go back!')
                    res.redirect('/login');
                }else {
                    res.render('index', {title: "SM - Mobile System", user: user});
                }
            }
        });
});

/**
 * Show the map based on Params
 */
router.get('/map', function (req, res) {
    if(req.query.map === undefined && req.query.type === undefined){
        res.status(200);
        res.header("Content-Type", "text/html");
        res.render('partials/map', {title: "SM",map:"OSM", type: "osm"});
    }else {    
        res.status(200);
        res.header("Content-Type", "text/html");
        res.render('partials/map', {title: "SM",map:req.query.map, type: req.query.type});
    }
    

});


function requiresLogin(req,res,next){
    if(req.session && req.session.userId){
        return next();
    }else {
        // var err = new Error('You must be logged in to view this page.');         
        // return res.status(401).send({
        //         insertionError: true,
        //         errors: err.message,
        //         statusCode: 401
        //         });
        req.flash('danger', 'You must be logged in to view this page.')
        res.redirect('/login');
    }
}


module.exports = router;