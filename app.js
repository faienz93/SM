/**
 * ===========================================================================
 * File: App.js 
 * Author: Antonio Faienza
 * This File define a server with Express.js It use for the creation of server 
 * a module (http) - REF: https://stackoverflow.com/a/17697134/4700162
 * ===========================================================================
 */
var createError = require('http-errors');
var path = require('path');
var express = require('express');
var app = express();
var logger = require('morgan');
var exphbs  = require("express-handlebars");



var app = express();

var login = require('./routes/login.js');


// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  
  // Uses multiple partials dirs, templates in "shared/templates/" are shared
  // with the client-side of the app (see below).
  // partialsDir: [
  //     'shared/templates/',
  //     'views/partials/'
  // ]
});


/**
 * Set html as view engine
 * REF: https://stackoverflow.com/a/44945104/4700162
 */
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine','ejs');
// app.engine('html', require('ejs').renderFile);
//=========================================================
app.engine('hbs', hbs.engine);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Define Morgan logger
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define reading of stating file
app.use('/',express.static(path.join(__dirname, 'views')));
// app.use('/layouts',express.static(path.join(__dirname, '../layouts')));
app.use('/example',express.static(path.join(__dirname, 'example')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));
app.use('/img',express.static(path.join(__dirname, 'img')));
app.use('/js',express.static(path.join(__dirname, 'js')));
// app.use(express.static(path.join(__dirname, '/')));

 


app.use('/', login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/**
 * For avoid a tipical error: "The canvas has been tainted by cross-origin data." 
 * I set Header and make image "Anonymus". I use this for the map of the type "Here"
 * 
 * REF: https://enable-cors.org/server_expressjs.html
 * REF: https://gis.stackexchange.com/questions/199540/avoiding-cors-error-with-openlayers-3
 * 
 * 
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


module.exports = app;