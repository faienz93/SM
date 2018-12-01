// http://expressjs.com/it/starter/static-files.html
// https://codeforgeek.com/2015/01/render-html-file-expressjs/

var express = require('express');
const mongoose = require('mongoose');
var app = express();
var path = require('path');
const auth = require('http-auth');

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


router.get('/addUser', function (req, res) {
  //   res.render(path.join(__dirname, '../views/map.html'));
      res.render('map');
  });

router.get('/redirect', function (req, res) {
//   res.render(path.join(__dirname, '../views/map.html'));
    res.render('map');
});

router.post('/resultRegistration', function (req, res) {
  console.log(req.body);
  const registration = new Registration(req.body);
  registration.save()
    .then(() => { 
        res.render('alert', {success: true, title: 'REGISTRATION SUCCESS', message: 'Your registration was successful'})
     })
    .catch(() => { 
        res.render('alert', {success: false, title: 'REGISTRATION ERROR', message: 'Sorry! Something went wrong.'})
     });
    
});


router.get('/allRegistration', auth.connect(basic), (req, res) => {
    Registration.find()
      .then((registrations) => {  res.send(registrations)
        })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
});



router.get('/', function (req, res, next) {
    res.render('login', {title: "SM - Login"});

    // if you have layout you can specify if you want to use him
    // res.render('home', {layout:false, title: "HELLO WORLD"});
});

router.get('/registration', function (req, res, next) {
    res.render('registration',{title: "SM - Registration"});

    // if you have layout you can specify if you want to use him
    // res.render('home', {layout:false, title: "HELLO WORLD"});
});


var counter = 0;
app.get('/counter', function(req, res) {
    res.cookie('counter', ++counter);

    if (!req.cookies.counter) {
        res.send('This is your first visit!');
    } else {
        res.send('This is visit number '+ req.cookies.counter +'!');
    }
});

module.exports = router;