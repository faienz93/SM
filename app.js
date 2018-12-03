/**
 * ===========================================================================
 * File: App.js 
 * Author: Antonio Faienza
 * This File define a server with Express.js It use for the creation of server 
 * a module (http) - REF: https://stackoverflow.com/a/17697134/4700162
 * ===========================================================================
 */

 /**
  * Requirements
  */
var createError = require('http-errors');
var path = require('path');
var express = require('express');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var exphbs  = require("express-handlebars");
var app = express();


/**
 * Routing
 */
var login = require('./routes/login.js');


/**
 * Define middelware for static file
 */
app.use('/',express.static(path.join(__dirname, 'views')));
app.use('/example',express.static(path.join(__dirname, 'example')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));
app.use('/img',express.static(path.join(__dirname, 'img')));
app.use('/js',express.static(path.join(__dirname, 'js')));
// app.use(express.static(path.join(__dirname, '/'))); 

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
  extname: 'hbs' // extension of the file

   
  /**
   * If you want a unique file that handle the other file.hbs you can create a layout file 
   * i.e 'main.hbs' inside a specific dir ie. 'layouts'
   * In this case you need only define a tag inside other file i.e <h1> {{title}} </h1>
   * 
   * REF: https://www.npmjs.com/package/express-handlebars 
   */
  // defaultLayout: 'main',  --> name of the layout file name i.e main.hbs
  // layoutsDir: path.join(__dirname, '/views/layouts/'), // dir where is contained the layout file
  
});


/**
 * View Engine
 */
app.engine('hbs', hbs.engine);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



/**
 * Define Morgan Logger
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





app.use('/', login);


/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
    next(createError(404));
  });


/**
 * Error handler
 */
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