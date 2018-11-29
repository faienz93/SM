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

// define reading of stating file
// app.use(express.static(path.join(__dirname, '/')));


// app.get('/', (req, res) => {
//     res.send('It works!');
//   });


// app.get('/',function(req,res){
//   res.sendFile('../views/index.html');
//   //__dirname : It will resolve to your project folder.
// });

router.post('/login', function (req, res) {
  console.log(req.body);
  const registration = new Registration(req.body);
  registration.save()
    .then(() => { res.send('Thank you for your registration!'); })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
  // res.send('Name: ' + req.body.name +  " mail " + req.body.email + ".");
});


router.get('/registrations', auth.connect(basic), (req, res) => {
    Registration.find()
      .then((registrations) => {  res.send(registrations)
        })
      .catch(() => { res.send('Sorry! Something went wrong.'); });
});






module.exports = router;