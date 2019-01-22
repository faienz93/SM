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
    // console.log(req.session);
    // https://github.com/Createdd/authenticationIntro/blob/master/routes/router.js RIGA 62
    User.findById(req.session.userId)
        .exec(function(error, user){
            if(error){
                return next(error);
            }else {
                if(user === null){
                    var err = new Error('Not authorized! Go back!');   //TODO vedere se mettere una pagina di errore      
                    return res.status(400).send({
                            insertionError: true,
                            errors: err.message,
                            statusCode: 400
                            });
                }else {
                    res.render('index', {title: "SM - Mobile System", user: user.username});
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
        // encodeURIComponent(JSON.stringify(jsonData)
    }
    // res.send(JSON.stringify(Obj));

});


function requiresLogin(req,res,next){
    if(req.session && req.session.userId){
        return next();
    }else {
        var err = new Error('You must be logged in to view this page.');         
        return res.status(401).send({
                insertionError: true,
                errors: err.message,
                statusCode: 401
                });
    }
}


module.exports = router;