// http://expressjs.com/it/starter/static-files.html
// https://codeforgeek.com/2015/01/render-html-file-expressjs/

var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
const auth = require('http-auth');
var app = express();

const router = express.Router();
const Registration = mongoose.model('Registration');

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

basic.on('success', (result, req) => {
    console.log(`User authenticated: ${result.user}`);
});

// define reading of stating file
// app.use(express.static(path.join(__dirname, '/')));



router.get('/', function(req, res) {
    res.redirect('/map');
});

router.get('/map', function (req, res) {
    
    res.status(200);
    res.header("Content-Type", "text/html");
    res.render('map', {title: "SM"});
    // res.send(JSON.stringify(Obj));

});

router.get('/map.type', function (req, res) { 
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({map:req.query.map, type: req.query.type }));
});



// I see all people registred
router.get('/allRegistration', auth.connect(basic), (req, res) => {
    Registration.find()
        .then((registrations) => {
            res.send(registrations)
        })
        .catch(() => { res.send('Sorry! Something went wrong.'); });
});



router.get('/login', function (req, res, next) {
    res.render('login', {layout:false, title: "SM - Login" });

    // if you have layout you can specify if you want to use him
    // res.render('login', {layout:false, title: "HELLO WORLD"});
});






module.exports = router;