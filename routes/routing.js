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