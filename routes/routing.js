/**
 * ===========================================================================
 * File: routing.js 
 * Author: Antonio Faienza
 * This handle the routing between a few page of the site 
 * ===========================================================================
 */


var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('Users');



// NOTE for static file..
// define reading of stating file
// app.use(express.static(path.join(__dirname, '/')));

router.get('/', function(req, res) {    
    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                return next(error);
            }else {
                if(user === null){
                    req.flash('danger', 'Not authorized! Go back!')
                    res.redirect('/login');
                }else {
                    res.render('index', {title: "SM - Mobile System", user: user});
                }
            }
        });
});

/**
 * Show partials of map
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

module.exports = router;