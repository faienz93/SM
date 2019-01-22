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



router.get('/', requiresLogin, function(req, res) {
    // console.log(req.session);
    // https://github.com/Createdd/authenticationIntro/blob/master/routes/router.js RIGA 62
    res.render('index', {title: "SM - Mobile System"});
});

router.get('/map', requiresLogin,function (req, res) {
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