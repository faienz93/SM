// http://expressjs.com/it/starter/static-files.html
// https://codeforgeek.com/2015/01/render-html-file-expressjs/

var express = require("express");
var app     = express();
var path    = require("path");


// define reading of stating file
// app.use(express.static(path.join(__dirname, '/')));


app.get('/', (req, res) => {
    res.send('It works!');
  });


module.exports = app;