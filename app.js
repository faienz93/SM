/**
 * ===========================================================================
 * File: App.js 
 * Author: Antonio Faienza
 * This File define a server with Express.js It use for the creation of server 
 * a module (http) - REF: https://stackoverflow.com/a/17697134/4700162
 * ===========================================================================
 */
// var createError = require('http-errors');
var path = require('path');
var express = require('express');
var app = express();
var logger = require('morgan');
var debug = require('debug')('sm:server');
var http = require('http');

// Define constant PORT
const PORT = normalizePort(process.env.PORT || 3000);
var app = express();

// Define Morgan logger
app.use(logger('dev'));

// define reading of stating file
app.use(express.static(path.join(__dirname, '/')));


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });

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


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
// ================ ALTERNATIVE ================
// app.listen(PORT, function () {
//     console.log("=============================");
//     console.log('Listening on port ' + PORT);
//     console.log("=============================");
// });
// =============================================


server.listen(PORT, function(){
    console.log("=============================");
    console.log('Listening on port ' + PORT);
    console.log("=============================");
});
server.on('error', onError);
server.on('listening', onListening);


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('DEBUG on --> ' + bind);
  }

