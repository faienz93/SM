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


router.get('/', function (req, res) {

    /**
     * Display all user from DB
     */
    // Registration.find()
    //     .then((registrations) => {
    //         //res.render(path.join(__dirname, '../views/map.html'));            
    //         // i wat send a notification of result of specific operation
    //         res.render('index', {title: "SM", users: registrations,  expressFlashSuccess: req.flash('success'),                                                      
    //                                                   expressFlashDanger: req.flash('danger'),
    //                                                   expressFlashWarning: req.flash('warning'), 
    //                                                   expressFlashInfo: req.flash('info'), });
            
    //     })
    //     .catch(() => { 
    //         res.render('error', { success: false, title: 'DISPLAY ERROR', message: 'I cannot show the user' })
    //      });

    res.render('map', {title: "SM"});

});

router.get('/redirect', function (req, res) {
    //   res.render(path.join(__dirname, '../views/map.html'));
    res.render('map');
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

router.get('/adduser', function (req, res) {
    res.render('adduser',{title: 'SM - Add new user'});
});




module.exports = router;