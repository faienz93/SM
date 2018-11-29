// http://expressjs.com/it/starter/static-files.html
// https://codeforgeek.com/2015/01/render-html-file-expressjs/

var express = require("express");
var app     = express();
var path    = require("path");


// define reading of stating file
// app.use(express.static(path.join(__dirname, '/')));


// app.get('/', (req, res) => {
//     res.send('It works!');
//   });


  // app.get('/',function(req,res){
  //   res.sendFile('../views/index.html');
  //   //__dirname : It will resolve to your project folder.
  // });

  app.post('/login', function(req, res) {
    console.log(req.body);
    // res.send('You sent the name "' + req.body.uname + '" ');
    res.send('Name: ' + req.body.uname + " pass: " + req.body.psw + " mail " + req.body.mail + ".");
  });


module.exports = app;