var createError = require('http-errors');
var path = require('path');
var express = require('express');
var app = express();
var logger = require('morgan');
var debug = require('debug')('sm:server');

// Define constant port
const PORT = normalizePort(process.env.PORT || 3000);

var app = express();

// Define logger
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

// Define DEBUG
debug('booting %o');

app.listen(PORT, function () {
    console.log("=============================");
    console.log('Listening on port ' + PORT);
    console.log("=============================");
});


